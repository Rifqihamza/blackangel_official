import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/* ======================
   PUT: update product
====================== */
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const product = await prisma.product.update({
        where: { id: Number(params.id) },
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

    return NextResponse.json(product)
}

/* ======================
   DELETE: delete product
====================== */
export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await prisma.product.delete({
        where: { id: Number(params.id) },
    })

    return NextResponse.json({ success: true })
}
