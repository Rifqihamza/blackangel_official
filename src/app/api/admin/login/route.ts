import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const user = await prisma.users.findUnique({
        where: { email }
    })

    if (!user || user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        )
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set({
        name: "admin_token",
        value: String(user.id), // simpan userId
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })

    return res
}
