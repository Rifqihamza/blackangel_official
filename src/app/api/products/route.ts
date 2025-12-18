import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
                skip,
                take: limit,
            }),
            prisma.product.count({
                where: { isActive: true },
            }),
        ])

        return NextResponse.json({
            data: products,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error("PRODUCT API ERROR:", error)

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
