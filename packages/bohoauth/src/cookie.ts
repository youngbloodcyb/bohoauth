export const COOKIE_NAME = "boho_token";

const ATTRIBUTES = "Path=/; HttpOnly; Secure; SameSite=Strict";

export const tokenCookie = (jwt: string) =>
  `${COOKIE_NAME}=${jwt}; ${ATTRIBUTES}`;

export const clearedTokenCookie = () =>
  `${COOKIE_NAME}=; ${ATTRIBUTES}; Max-Age=0`;

/** Reads the token from a plain Request's Cookie header. */
export const readTokenFromRequest = (req: Request): string | undefined => {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE_NAME) return rest.join("=") || undefined;
  }
  return undefined;
};
