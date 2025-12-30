import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    const page = Number(req.nextUrl.searchParams.get("page") ?? 1)
    const limit = 12
    const skip = (page - 1) * limit

    const [products, totalItems] = await Promise.all([
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
        products,
        page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
    })
}
