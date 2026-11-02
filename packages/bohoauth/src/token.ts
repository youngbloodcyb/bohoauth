import * as jose from "jose";

const encode = (secret: string) => new TextEncoder().encode(secret);

export const signToken = (
  secret: string,
  expiresIn: number | string | Date,
): Promise<string> =>
  new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encode(secret));

/**
 * Verifies a token. Returns its payload if valid, or null if the token is
 * missing, expired, tampered with, or no secret is configured.
 */
export const verifyToken = async (
  token: string | undefined,
  secret: string | undefined,
): Promise<jose.JWTPayload | null> => {
  if (!token || !secret) return null;
  try {
    const { payload } = await jose.jwtVerify(token, encode(secret), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
};
