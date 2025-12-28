import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" }
        })

        return NextResponse.json({ data: categories })
    } catch (error) {
        console.error("CATEGORIES API ERROR:", error)

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
