import { NextRequest, NextResponse } from "next/server.js";
import { ResolvedConfig } from "./config.js";
import { COOKIE_NAME } from "./cookie.js";
import { createPathMatcher, normalizePath } from "./paths.js";
import { verifyToken } from "./token.js";

export const createMiddleware = ({
  basePath,
  loginPath,
  protectedPaths,
  publicPaths,
  redirectPath,
  secret,
}: ResolvedConfig) => {
  // Compile patterns once, so invalid patterns fail at startup.
  const isProtected = createPathMatcher(protectedPaths);
  const isPublic = createPathMatcher(publicPaths);

  // Never protected, whatever the config says. Otherwise protecting "/" would
  // block the login route itself and the login page's JS and CSS.
  const isAlwaysAllowed = createPathMatcher([basePath, "/_next/static"]);

  const normalizedLoginPath = normalizePath(loginPath);

  return async (request: NextRequest) => {
    const currentPath = request.nextUrl.pathname;
    const isLoginPage = normalizePath(currentPath) === normalizedLoginPath;

    if (!isLoginPage) {
      if (
        isAlwaysAllowed(currentPath) ||
        isPublic(currentPath) ||
        !isProtected(currentPath)
      ) {
        return NextResponse.next();
      }
    }

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
};
