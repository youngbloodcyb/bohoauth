import { ResolvedConfig } from "../config.js";
import { readTokenFromRequest } from "../cookie.js";
import { verifyToken } from "../token.js";
import { json } from "./utils.js";

export type Session =
  | { authenticated: true; expiresAt: string | null }
  | { authenticated: false };

/**
 * GET /session
 *
 * Reports whether the current request carries a valid session.
 */
export const session = async (req: Request, config: ResolvedConfig) => {
  const payload = await verifyToken(readTokenFromRequest(req), config.secret);
  const body: Session = payload
    ? {
        authenticated: true,
        expiresAt: payload.exp
          ? new Date(payload.exp * 1000).toISOString()
          : null,
      }
    : { authenticated: false };
  return json(body);
};
