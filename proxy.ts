// 13.0 for authentication using proxy we will follow the documentation of better auth "https://better-auth.com/docs/integrations/next#auth-protection"

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  console.log("Session cookies", sessionCookie);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/logIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-task", "/create-blog"], // Specify the routes the proxy applies to
};
