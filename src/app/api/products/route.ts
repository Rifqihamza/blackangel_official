import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page") ?? 1)
        const limit = Number(searchParams.get("limit") ?? 8)
        const skip = (page - 1) * limit

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where: { isActive: true },
                include: { category: true },
                orderBy: { createdAt: "desc" },
                take: limit,
                skip,
            }),
            prisma.product.count({
                where: { isActive: true },
            }),
        ])

        return NextResponse.json({
            data: products,
            total,
            totalPages: Math.ceil(total / limit),
            page,
        })
    } catch (error) {
        console.error("API /products ERROR 👉", error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
