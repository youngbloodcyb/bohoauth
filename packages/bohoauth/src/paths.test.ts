import { describe, expect, it } from "vitest";
import { createPathMatcher, PathPattern } from "./paths.js";

const matches = (pattern: PathPattern, path: string) =>
  createPathMatcher([pattern])(path);

const check = (pattern: PathPattern, yes: string[], no: string[]) => {
  for (const path of yes) expect(matches(pattern, path), path).toBe(true);
  for (const path of no) expect(matches(pattern, path), path).toBe(false);
};

describe("plain paths", () => {
  it("match the path and everything under it", () => {
    check(
      "/dashboard",
      ["/dashboard", "/dashboard/", "/dashboard/settings", "/dashboard/a/b"],
      ["/", "/dash", "/other", "/api/dashboard"],
    );
  });

  it("only match at a segment boundary", () => {
    check("/protected", ["/protected/x"], ["/protected-foo", "/protectedx"]);
  });

  it("treat a trailing slash in the pattern the same as none", () => {
    check("/dashboard/", ["/dashboard", "/dashboard/x"], ["/dashboards"]);
  });

  it('"/" matches everything', () => {
    check("/", ["/", "/a", "/a/b/c"], []);
  });

  it("escape regex characters", () => {
    check("/a.b", ["/a.b", "/a.b/c"], ["/axb"]);
    check("/(group)", ["/(group)"], ["/group"]);
  });

  it("are case-sensitive, like Next.js routes", () => {
    check("/Dashboard", ["/Dashboard"], ["/dashboard"]);
  });
});

describe(":param", () => {
  it("matches exactly one segment", () => {
    check("/:id", ["/abc", "/123", "/abc/"], ["/", "/abc/def"]);
  });

  it("works between literal segments", () => {
    check(
      "/users/:id/settings",
      ["/users/1/settings", "/users/abc/settings/"],
      ["/users/settings", "/users/1/settings/extra", "/users/1/2/settings"],
    );
  });

  it("can be combined with :rest* to include subpaths", () => {
    check("/:id/:rest*", ["/abc", "/abc/def", "/abc/def/ghi"], ["/"]);
  });
});

describe(":param*", () => {
  it("matches zero or more segments", () => {
    check(
      "/blog/:slug*",
      ["/blog", "/blog/", "/blog/a", "/blog/a/b/c"],
      ["/blogs", "/blog-post", "/"],
    );
  });
});

describe(":param+", () => {
  it("matches one or more segments", () => {
    check("/docs/:path+", ["/docs/a", "/docs/a/b"], ["/docs", "/docs/"]);
  });
});

describe(":param?", () => {
  it("matches zero or one segment", () => {
    check("/shop/:category?", ["/shop", "/shop/shoes"], ["/shop/shoes/red"]);
  });

  it("matches the root when it is the only segment", () => {
    check("/:id?", ["/", "/abc"], ["/abc/def"]);
  });
});

describe("RegExp", () => {
  it("is tested against the pathname", () => {
    check(/^\/org\/\d+/, ["/org/1", "/org/42/settings"], ["/org/abc", "/org"]);
  });

  it("is not affected by the global flag", () => {
    const matcher = createPathMatcher([/^\/org/g]);
    // A /g regex reused with .test() would alternate true/false.
    expect([1, 2, 3].map(() => matcher("/org"))).toEqual([true, true, true]);
  });
});

describe("lists", () => {
  it("match if any pattern matches", () => {
    const matcher = createPathMatcher(["/a", "/b/:id"]);
    expect(matcher("/a/x")).toBe(true);
    expect(matcher("/b/1")).toBe(true);
    expect(matcher("/c")).toBe(false);
  });

  it("match nothing when empty", () => {
    expect(createPathMatcher([])("/")).toBe(false);
  });
});

describe("invalid patterns", () => {
  it.each([
    ["dashboard", /must start with "\/"/],
    ["/blog/*", /named wildcard/],
    ["/post-:id", /whole segment/],
    ["/:", /not a valid parameter/],
    ["/:1id", /not a valid parameter/],
    ["/:path(.*)", /not a valid parameter/],
  ])("throws for %s", (pattern, message) => {
    expect(() => createPathMatcher([pattern])).toThrow(message);
  });

  it("throws for non-string, non-RegExp values", () => {
    expect(() => createPathMatcher([42 as unknown as string])).toThrow(
      /expected a string or RegExp/,
    );
  });
});
