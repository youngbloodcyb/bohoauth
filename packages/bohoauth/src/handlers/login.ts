import { ResolvedConfig } from "../config.js";
import { tokenCookie } from "../cookie.js";
import { signToken } from "../token.js";
import { isFormRequest, json, redirect, safeCallbackUrl } from "./utils.js";

/**
 * POST /login
 *
 * Accepts { password, callbackUrl? } as JSON or as a native form submission.
 * JSON requests get a JSON response; form requests get a 303 redirect.
 */
export const login = async (req: Request, config: ResolvedConfig) => {
  const { password: key, secret, expiresIn, loginPath, redirectPath } = config;
  const fromForm = isFormRequest(req);

  if (!key || !secret) {
    return json({ error: "Missing password or secret" }, { status: 500 });
  }

  let password: unknown;
  let callbackUrl: unknown;
  try {
    if (fromForm) {
      const form = await req.formData();
      password = form.get("password");
      callbackUrl = form.get("callbackUrl");
    } else {
      ({ password, callbackUrl } = await req.json());
    }
  } catch {
    return json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof password !== "string" || password !== key) {
    return fromForm
      ? redirect(`${loginPath}?error=invalid_password`, req)
      : json({ error: "Invalid password" }, { status: 401 });
  }

  const jwt = await signToken(secret, expiresIn);
  const headers = { "Set-Cookie": tokenCookie(jwt) };
  const to = safeCallbackUrl(callbackUrl, req) ?? redirectPath;

  return fromForm
    ? redirect(to, req, headers)
    : json({ ok: true, redirectTo: to }, { headers });
};
