import { NextRequest } from "next/server.js";
import { describe, expect, it } from "vitest";
import { bohoAuth } from "./index.js";
import { BohoAuthOptions } from "./types.js";

const secret = "test-secret-that-is-long-enough-for-hs256";

const setup = (middleware: BohoAuthOptions["middleware"], basePath?: string) =>
  bohoAuth({ password: "pw", secret, basePath, middleware });

const loginCookie = async (boho: ReturnType<typeof setup>) => {
  const res = await boho.handlers.POST(
    new Request("http://localhost/api/boho/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: "pw" }),
    }),
  );
  return res.headers.get("set-cookie")!.split(";")[0]!;
};

/** Runs the middleware and returns the redirect target, or null if allowed. */
const visit = async (
  boho: ReturnType<typeof setup>,
  path: string,
  cookie?: string,
) => {
  const req = new NextRequest(`http://localhost${path}`, {
    headers: cookie ? { cookie } : {},
  });
  const res = await boho.middleware(req);
  const location = res.headers.get("location");
  return location ? new URL(location).pathname : null;
};

describe("middleware", () => {
  it("protects top-level dynamic routes like /[id]", async () => {
    const boho = setup({ loginPath: "/login", protectedPaths: ["/:id"] });
    expect(await visit(boho, "/abc")).toBe("/login");
    expect(await visit(boho, "/")).toBeNull();
    expect(await visit(boho, "/abc/def")).toBeNull();
  });

  it("allows protected paths once logged in", async () => {
    const boho = setup({ loginPath: "/login", protectedPaths: ["/:id"] });
    const cookie = await loginCookie(boho);
    expect(await visit(boho, "/abc", cookie)).toBeNull();
  });

  it("treats an invalid token as logged out", async () => {
    const boho = setup({ loginPath: "/login", protectedPaths: ["/:id"] });
    expect(await visit(boho, "/abc", "boho_token=garbage")).toBe("/login");
  });

  it("no longer matches across segment boundaries", async () => {
    const boho = setup({ protectedPaths: ["/protected"] });
    expect(await visit(boho, "/protected/page")).toBe("/login");
    expect(await visit(boho, "/protected-foo")).toBeNull();
  });

  it("lets publicPaths override protectedPaths", async () => {
    const boho = setup({
      protectedPaths: ["/"],
      publicPaths: ["/about", "/blog/:slug*"],
    });
    expect(await visit(boho, "/dashboard")).toBe("/login");
    expect(await visit(boho, "/about")).toBeNull();
    expect(await visit(boho, "/blog/post")).toBeNull();
  });

  describe('when protecting everything with "/"', () => {
    const boho = setup({ loginPath: "/login", protectedPaths: ["/"] });

    it("still allows the login page", async () => {
      expect(await visit(boho, "/login")).toBeNull();
      expect(await visit(boho, "/login/")).toBeNull();
    });

    it("still allows boho's own API routes", async () => {
      expect(await visit(boho, "/api/boho/login")).toBeNull();
      expect(await visit(boho, "/api/boho/session")).toBeNull();
    });

    it("still allows Next.js static assets", async () => {
      expect(await visit(boho, "/_next/static/chunks/main.js")).toBeNull();
    });

    it("protects other API routes", async () => {
      expect(await visit(boho, "/api/secret")).toBe("/login");
    });
  });

  it("exempts a custom basePath", async () => {
    const boho = setup({ protectedPaths: ["/"] }, "/auth");
    expect(await visit(boho, "/auth/login")).toBeNull();
    expect(await visit(boho, "/api/boho/login")).toBe("/login");
  });

  it("redirects logged-in users away from the login page", async () => {
    const boho = setup({ loginPath: "/login", redirectPath: "/home" });
    const cookie = await loginCookie(boho);
    expect(await visit(boho, "/login", cookie)).toBe("/home");
    expect(await visit(boho, "/login")).toBeNull();
  });

  it("throws at setup for an invalid pattern", () => {
    expect(() => setup({ protectedPaths: ["/blog/*"] })).toThrow(
      /named wildcard/,
    );
  });
});
