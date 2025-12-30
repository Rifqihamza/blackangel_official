import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required" },
                { status: 400 }
            )
        }

        const product = await prisma.product.findFirst({
            where: {
                slug,
                isActive: true,
            },
            include: {
                category: true,
            },
        })

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("GET PRODUCT ERROR:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
