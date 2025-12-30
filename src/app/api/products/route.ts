import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get("page") ?? 1)
    const categoryId = searchParams.get("category")
    const search = searchParams.get("search")

    const limit = 12
    const skip = (page - 1) * limit

    try {
        const where: Prisma.ProductWhereInput = {
            isActive: true,
        }

        if (categoryId) {
            where.categoryId = Number(categoryId)
        }

        if (search) {
            where.name = {
                contains: search,
                mode: "insensitive",
            }
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: { category: true },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ])

        return NextResponse.json({
            data: products,
            pagination: {
                page,
                totalPages: Math.ceil(total / limit),
                total,
            },
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        )
    }
}
