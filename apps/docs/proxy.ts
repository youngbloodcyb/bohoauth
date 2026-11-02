import { boho } from "~/lib/boho";

export const proxy = boho.middleware;

export const config = {
  matcher: ["/demo/:path*"],
};
