import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const isAdmin = req.nextUrl.pathname.startsWith("/admin");
    if (!isAdmin)
        return NextResponse.next()

    const key = req.nextUrl.searchParams.get("key");
    if (key !== process.env.ADMIN_SECRET_KEY)
        return NextResponse.redirect(new URL("/", req.url))

    return NextResponse.next()
}