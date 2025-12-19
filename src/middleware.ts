import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
    const res = NextResponse.next();

    if (req.nextUrl.pathname.startsWith("/dashboard") && req.nextUrl.pathname !== "/dashboard/login") {
        const adminKey = req.cookies.get("admin_token")?.value;

        if (!adminKey) {
            return NextResponse.redirect(new URL("/dashboard/login", req.url));
        }

        // Set header to indicate dashboard
        res.headers.set("x-is-dashboard", "true");
    }

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
