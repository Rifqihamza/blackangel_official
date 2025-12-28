import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Jangan proteksi assets/public
    if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
        return NextResponse.next();
    }

    // Ambil token dari NextAuth JWT
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Proteksi dashboard kecuali login
    if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
        if (!token || token.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/login", req.url));
        }
    }

    // Redirect jika sudah login ke login page
    if (pathname === "/dashboard/login" && token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
