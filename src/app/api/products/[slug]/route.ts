import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    _req: Request,
    { params }: { params: { slug: string } }
) {
    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
        include: { category: true },
    })

    if (!product || !product.isActive) {
        return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        )
    }

    return NextResponse.json(product)
}
