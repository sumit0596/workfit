import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Wrap your custom middleware inside NextAuth's `withAuth`
export default withAuth(
  function middleware(request) {
    // 1. This custom logic runs on every matched route
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token; 
        }
        
        return true; 
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};