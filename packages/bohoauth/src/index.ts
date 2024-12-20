import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server.js";
import { BohoAuthOptions } from "./types.js";

/**
 * Helper function to create a handler for bohoauth
 *
 * Takes options of type BohoAuthOptions
 * returns a handler to be used in Next.js route handlers
 */
const createHandler = (options: BohoAuthOptions) => {
  const key = options.password || process.env.BOHO_PASSWORD;
  const secret = options.secret || process.env.BOHO_SECRET;
  const expiresIn = options.expiresIn || "1h";

  return async (req: Request) => {
    try {
      const { password } = await req.json();

      if (!key || !secret) {
        return new Response("Missing password or secret", { status: 500 });
      }

      if (password === key) {
        const encodedSecret = new TextEncoder().encode(secret);
        const jwt = await new jose.SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(expiresIn)
          .sign(encodedSecret);

        return new Response("Authentication successful", {
          headers: {
            "Set-Cookie": `boho_token=${jwt}; Path=/; HttpOnly; Secure; SameSite=Strict`,
          },
        });
      }

      return new Response("Invalid password", { status: 401 });
    } catch (error) {
      return new Response("Internal server error", { status: 500 });
    }
  };
};

/**
 * Initializes boho auth
 *
 * Takes options of type BohoAuthOptions
 * returns an object with handlers and middleware
 */
export const bohoAuth = (options: BohoAuthOptions) => {
  const secret = options.secret || process.env.BOHO_SECRET;
  const redirectPath = options.middleware?.redirectPath || "/";

  return {
    handlers: {
      POST: createHandler(options),
    },
    middleware: async (request: NextRequest) => {
      const loginPath = options.middleware?.loginPath || "/login";
      const protectedPaths = options.middleware?.protectedPaths || [];
      const currentPath = request.nextUrl.pathname;
      const token = request.cookies.get("boho_token")?.value;

      // Early return for unprotected paths
      const isProtectedPath = protectedPaths.some((path) =>
        currentPath.startsWith(path),
      );
      if (!isProtectedPath && currentPath !== loginPath)
        return NextResponse.next();

      const isLoginPage = currentPath === loginPath;

      // If no token, redirect to login (except if already on login page)
      if (!token) {
        return isLoginPage
          ? NextResponse.next()
          : NextResponse.redirect(new URL(loginPath, request.url));
      }

      // Verify token and handle accordingly
      try {
        await jose.jwtVerify(token, new TextEncoder().encode(secret));

        // Redirect away from login page if authenticated
        return isLoginPage
          ? NextResponse.redirect(new URL(redirectPath, request.url))
          : NextResponse.next();
      } catch (error) {
        // Invalid token behaves same as no token
        return isLoginPage
          ? NextResponse.next()
          : NextResponse.redirect(new URL(loginPath, request.url));
      }
    },
  };
};
