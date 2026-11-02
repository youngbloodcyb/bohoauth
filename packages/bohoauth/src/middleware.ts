import { NextRequest, NextResponse } from "next/server.js";
import { ResolvedConfig } from "./config.js";
import { COOKIE_NAME } from "./cookie.js";
import { verifyToken } from "./token.js";

export const createMiddleware =
  ({ loginPath, protectedPaths, redirectPath, secret }: ResolvedConfig) =>
  async (request: NextRequest) => {
    const currentPath = request.nextUrl.pathname;
    const isLoginPage = currentPath === loginPath;
    const isProtectedPath = protectedPaths.some((path) =>
      currentPath.startsWith(path),
    );

    // Early return for unprotected paths
    if (!isProtectedPath && !isLoginPage) return NextResponse.next();

    const token = request.cookies.get(COOKIE_NAME)?.value;
    const authenticated = (await verifyToken(token, secret)) !== null;

    if (isLoginPage) {
      // Redirect away from login page if already authenticated
      return authenticated
        ? NextResponse.redirect(new URL(redirectPath, request.url))
        : NextResponse.next();
    }

    return authenticated
      ? NextResponse.next()
      : NextResponse.redirect(new URL(loginPath, request.url));
  };
