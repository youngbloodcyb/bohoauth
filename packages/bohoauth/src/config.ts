import { PathPattern } from "./paths.js";
import { BohoAuthOptions } from "./types.js";

/**
 * Fully-resolved configuration. Options are merged with environment
 * variables and defaults exactly once, in bohoAuth().
 */
export type ResolvedConfig = {
  password: string | undefined;
  secret: string | undefined;
  expiresIn: number | string | Date;
  basePath: string;
  loginPath: string;
  protectedPaths: PathPattern[];
  publicPaths: PathPattern[];
  redirectPath: string;
};

export const resolveConfig = (options: BohoAuthOptions): ResolvedConfig => ({
  password: options.password || process.env.BOHO_PASSWORD,
  secret: options.secret || process.env.BOHO_SECRET,
  expiresIn: options.expiresIn || "1h",
  basePath: options.basePath || "/api/boho",
  loginPath: options.middleware?.loginPath || "/login",
  protectedPaths: options.middleware?.protectedPaths || [],
  publicPaths: options.middleware?.publicPaths || [],
  redirectPath: options.middleware?.redirectPath || "/",
});
