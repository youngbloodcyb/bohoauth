import { ResolvedConfig } from "../config.js";
import { clearedTokenCookie } from "../cookie.js";
import { isFormRequest, json, redirect } from "./utils.js";

/**
 * POST /logout
 *
 * Clears the session cookie. Form requests are redirected to the login page.
 * POST-only so links and prefetches can't sign a user out.
 */
export const logout = async (req: Request, config: ResolvedConfig) => {
  const headers = { "Set-Cookie": clearedTokenCookie() };
  return isFormRequest(req)
    ? redirect(config.loginPath, req, headers)
    : json({ ok: true }, { headers });
};
