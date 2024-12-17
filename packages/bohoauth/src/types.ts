export type AuthOptions = {
  // defaults to BOHO_PASSWORD
  password: string;
  // defaults to BOHO_SECRET
  secret: string;
  // defaults to 1h
  expiresIn?: string;
  callbacks?: {
    signIn?: (...args: any[]) => Promise<any>;
    signOut?: (...args: any[]) => Promise<any>;
  };
  // middleware options
  middleware?: {
    // defaults to /login
    loginPath?: string;
    // defaults to []
    protectedPaths?: string[];
  };
};
