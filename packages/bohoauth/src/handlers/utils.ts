/**
 * True when the request came from a native HTML <form> submission, in which
 * case handlers respond with a redirect instead of JSON.
 */
export const isFormRequest = (req: Request): boolean => {
  const type = req.headers.get("content-type") ?? "";
  return (
    type.startsWith("application/x-www-form-urlencoded") ||
    type.startsWith("multipart/form-data")
  );
};

export const json = (body: unknown, init: ResponseInit = {}) => {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), { ...init, headers });
};

export const redirect = (
  to: string,
  req: Request,
  headers: HeadersInit = {},
) => {
  const h = new Headers(headers);
  h.set("Location", new URL(to, req.url).toString());
  // 303 so the browser follows up with a GET
  return new Response(null, { status: 303, headers: h });
};

/**
 * Only allow same-origin relative paths, so the login route can't be used as
 * an open redirect (e.g. callbackUrl=https://evil.com or //evil.com).
 */
export const safeCallbackUrl = (
  value: unknown,
  req: Request,
): string | undefined => {
  if (typeof value !== "string" || !value.startsWith("/")) return undefined;
  if (value.startsWith("//") || value.startsWith("/\\")) return undefined;
  try {
    const base = new URL(req.url);
    const url = new URL(value, base);
    if (url.origin !== base.origin) return undefined;
    return url.pathname + url.search + url.hash;
  } catch {
    return undefined;
  }
};
