import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
        return NextResponse.json({ admin: null }, { status: 401 })
    }

    const admin = await prisma.users.findUnique({
        where: { id: token },
        select: {
            id: true,
            name: true,
            role: true,
        },
    })

    if (!admin || admin.role !== "ADMIN") {
        return NextResponse.json({ admin: null }, { status: 401 })
    }

    return NextResponse.json({ admin })
}
