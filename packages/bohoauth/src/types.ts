import { PathPattern } from "./paths.js";

/**
 * Options for the bohoauth middleware
 *
 * loginPath - The path to the login page ex: /login
 * protectedPaths - The paths that are protected by the bohoauth middleware ex: ["/dashboard", "/:id"]
 * publicPaths - Exceptions to protectedPaths that stay public ex: ["/about"]
 * redirectPath - The path to redirect to after successful authentication ex: /
 *
 * Paths can be plain paths ("/dashboard" protects it and everything under
 * it), patterns with parameters ("/:id", "/blog/:slug*"), or a RegExp.
 */
type MiddlewareOptions = {
  loginPath?: string;
  protectedPaths?: PathPattern[];
  publicPaths?: PathPattern[];
  redirectPath?: string;
};

/**
 * Options for bohoauth
 *
 * password - The password for the bohoauth middleware
 * secret - The secret for the bohoauth middleware
 * expiresIn - The expiration time for the bohoauth middleware (reference jose.SignJWT.setExpirationTime) ex: 1h
 * basePath - Where boho.handlers is mounted ex: /api/boho. These routes are never protected.
 * middleware - The middleware options for the bohoauth middleware of type MiddlewareOptions
 */
export type BohoAuthOptions = {
  // defaults to BOHO_PASSWORD
  password?: string;
  // defaults to BOHO_SECRET
  secret?: string;
  // defaults to 1h
  expiresIn?: number | string | Date;
  // defaults to /api/boho
  basePath?: string;
  // middleware options
  middleware?: MiddlewareOptions;
};
