import { bohoAuth } from "@repo/bohoauth";

export const boho = bohoAuth({
  password: process.env.BOHO_PASSWORD!,
  secret: process.env.BOHO_SECRET!,
  expiresIn: "1h",
  middleware: {
    loginPath: "/demo/login",
    protectedPaths: ["/demo/protected"],
  },
});
