import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token");
  console.log(req.cookies.get("next-auth.session-token"));

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = { matcher: ["/dashboard/:route*"] };
