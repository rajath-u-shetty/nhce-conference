import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const token = await getToken({ req: request });
    const isAdmin = token?.role === "ADMIN";
    const isAdminPanel = request.nextUrl.pathname.startsWith("/admin");

    // Redirect authenticated non-admin users away from admin pages
    if (isAdminPanel && !isAdmin) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true to allow the request to continue
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/sign-in",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};


