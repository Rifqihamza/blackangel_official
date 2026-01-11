import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadImages } from '@/lib/cloudinary'

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


export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const files = formData.getAll("images") as File[]

    if (!files.length) {
        return NextResponse.json({ message: "Images required" }, { status: 400 })
    }

    const imageUrls = await uploadImages(files)

    const product = await prisma.product.create({
        data: {
            name: formData.get("name")!.toString(),
            slug: formData.get("slug")!.toString(),
            description: formData.get("description")?.toString(),
            price: Number(formData.get("price")),
            categoryId: Number(formData.get("categoryId")),
            isActive: true,
            images: imageUrls,
        },
    })

    return NextResponse.json(product)
}
