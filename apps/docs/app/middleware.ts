import { NextRequest } from "next/server";
import { boho } from "~/lib/boho";

export async function middleware(request: NextRequest) {
  return boho.middleware(request);
}

export const config = {
  matcher: ["/test", "/login"],
};
