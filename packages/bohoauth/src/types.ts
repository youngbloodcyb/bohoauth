/**
 * Options for the bohoauth middleware
 *
 * loginPath - The path to the login page ex: /login
 * protectedPaths - The paths that are protected by the bohoauth middleware ex: ["/dashboard"]
 * redirectPath - The path to redirect to after successful authentication ex: /
 */
type MiddlewareOptions = {
  loginPath?: string;
  protectedPaths?: string[];
  redirectPath?: string;
};

/**
 * Options for bohoauth
 *
 * password - The password for the bohoauth middleware
 * secret - The secret for the bohoauth middleware
 * expiresIn - The expiration time for the bohoauth middleware (reference jose.SignJWT.setExpirationTime) ex: 1h
 * middleware - The middleware options for the bohoauth middleware of type MiddlewareOptions
 */
export type BohoAuthOptions = {
  // defaults to BOHO_PASSWORD
  password: string;
  // defaults to BOHO_SECRET
  secret: string;
  // defaults to 1h
  expiresIn?: number | string | Date;
  // middleware options
  middleware?: MiddlewareOptions;
};
