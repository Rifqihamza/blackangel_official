import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params // ✅ FIX UTAMA

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required" },
                { status: 400 }
            )
        }

        const product = await prisma.product.findUnique({
            where: { slug },
            include: { category: true },
        })

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("GET PRODUCT BY SLUG ERROR 👉", error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
