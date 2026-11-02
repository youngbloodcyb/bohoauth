import { resolveConfig } from "./config.js";
import { createHandlers } from "./handlers/index.js";
import { createMiddleware } from "./middleware.js";
import { BohoAuthOptions } from "./types.js";

export type { BohoAuthOptions } from "./types.js";
export type { PathPattern } from "./paths.js";
export type { Session } from "./handlers/session.js";

/**
 * Initializes boho auth
 *
 * Takes options of type BohoAuthOptions
 * returns an object with handlers and middleware
 *
 * Mount the handlers in a catch-all route:
 *
 *   // app/api/boho/[...boho]/route.ts
 *   export const { GET, POST } = boho.handlers;
 *
 * which serves POST /api/boho/login, POST /api/boho/logout and
 * GET /api/boho/session.
 */
export const bohoAuth = (options: BohoAuthOptions) => {
  const config = resolveConfig(options);

  return {
    handlers: createHandlers(config),
    middleware: createMiddleware(config),
  };
};
