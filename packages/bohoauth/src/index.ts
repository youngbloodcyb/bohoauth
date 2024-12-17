import * as jose from "jose";

// auth.ts (your library's entry point)
type AuthOptions = {
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
};

const createHandler = (method: string, options: AuthOptions) => {
  const key = options.password || process.env.BOHO_PASSWORD;
  const secret = options.secret || process.env.BOHO_SECRET;
  const expiresIn = options.expiresIn || "1h";

  return async (req: Request) => {
    // Implement logic for handling requests
    if (method === "GET") {
      // Handle GET requests
      return new Response("GET handler response");
    }
    if (method === "POST") {
      // Handle POST requests
      try {
        const { password } = await req.json();

        if (!key || !secret) {
          return new Response("Missing password or secret", { status: 500 });
        }

        if (password === key) {
          const encodedSecret = new TextEncoder().encode(secret);
          const jwt = await new jose.SignJWT({})
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(expiresIn)
            .sign(encodedSecret);

          return new Response("Authentication successful", {
            headers: {
              "Set-Cookie": `boho_token=${jwt}; Path=/; HttpOnly; Secure; SameSite=Strict`,
            },
          });
        }

        return new Response("Invalid password", { status: 401 });
      } catch (error) {
        return new Response("Internal server error", { status: 500 });
      }
    }
    return new Response("Method not allowed", { status: 405 });
  };
};

export const initializeAuth = (options: AuthOptions) => {
  return {
    handlers: {
      GET: createHandler("GET", options),
      POST: createHandler("POST", options),
    },
    // Optionally expose other utility methods
    signIn: async () => {
      // Custom sign-in logic
    },
    signOut: async () => {
      // Custom sign-out logic
    },
  };
};
