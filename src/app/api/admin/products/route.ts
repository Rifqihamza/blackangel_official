import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/* ======================
   GET: list products
====================== */
export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(products)
}

/* ======================
   POST: create product
====================== */
export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const product = await prisma.product.create({
        data: {
            name: body.name,
            slug: body.slug,
            description: body.description,
            price: body.price,
            images: body.images,
            categoryId: body.categoryId,
            isActive: body.isActive,
        },
    })

    return NextResponse.json(product, { status: 201 })
}
