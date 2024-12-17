import { NextRequest } from "next/server";
import { boho } from "~/lib/boho";

export const { middleware } = boho;

export const config = {
  matcher: ["/test", "/login"],
};
