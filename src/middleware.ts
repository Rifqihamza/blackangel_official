import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { logger } from "@/lib/logger";

const PUBLIC_PATHS = ["/_next", "/favicon.ico", "/public"];
const LOGIN_PATH = "/dashboard/login";
const DASHBOARD_PATH = "/dashboard";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    /* ===== Skip public/static assets ===== */
    if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    /* ===== Auth token ===== */
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    /* ===== Protect dashboard (ADMIN only) ===== */
    const isDashboard = pathname.startsWith(DASHBOARD_PATH);
    const isLoginPage = pathname === LOGIN_PATH;

    if (isDashboard && !isLoginPage) {
        if (!token || token.role !== "ADMIN") {
            logger.security("Unauthorized dashboard access", req, {
                path: pathname,
                tokenPresent: Boolean(token),
                tokenRole: token?.role,
            });

            return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
        }
    }

    /* ===== Redirect logged-in admin from login page ===== */
    if (isLoginPage && token?.role === "ADMIN") {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
    }

    /* ===== Basic header anomaly check ===== */
    const suspiciousHeaders = ["x-host"];

    const detectedHeaders = suspiciousHeaders.filter(h =>
        req.headers.has(h)
    );

    if (detectedHeaders.length > 0) {
        logger.security("Suspicious headers detected", req, {
            headers: detectedHeaders,
        });

        return new NextResponse(null, { status: 400 });
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
