import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const page = Number(searchParams.get("page") ?? 1)
        const limit = Number(searchParams.get("limit") ?? 8)
        const search = searchParams.get("search") ?? ""
        const filterActive = searchParams.get("filterActive") ?? "active" // Default to active for public
        const categoryId = searchParams.get("categoryId") ?? ""
        const skip = (page - 1) * limit

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: { [key: string]: any } = {}

        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive'
            }
        }

        if (filterActive === "active") {
            where.isActive = true
        } else if (filterActive === "inactive") {
            where.isActive = false
        }
        // For 'all', no isActive filter

        if (categoryId) {
            where.categoryId = parseInt(categoryId)
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: { category: true },
                orderBy: { createdAt: "asc" },
                skip,
                take: limit,
            }),
            prisma.product.count({
                where,
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
