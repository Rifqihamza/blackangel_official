import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadImages, deleteImage, assertImages } from "@/lib/cloudinary"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const idNum = Number(id)
    const formData = await req.formData()

    const product = await prisma.product.findUnique({ where: { id: idNum } })
    if (!product) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const removedImages: string[] = JSON.parse(
        formData.get("removedImages")?.toString() || "[]"
    )

    // delete removed images from cloudinary
    await Promise.all(removedImages.map(deleteImage))

    let images = assertImages(product.images)
        .filter(img => !removedImages.includes(img))

    const newFiles = formData.getAll("newImages") as File[]
    if (newFiles.length) {
        const newUrls = await uploadImages(newFiles)
        images = [...images, ...newUrls]
    }

    const updated = await prisma.product.update({
        where: { id: idNum },
        data: {
            name: formData.get("name")?.toString(),
            slug: formData.get("slug")?.toString(),
            description: formData.get("description")?.toString(),
            price: Number(formData.get("price")),
            categoryId: Number(formData.get("categoryId")),
            isActive: formData.get("isActive") === "true",
            images,
        },
    })

    return NextResponse.json(updated)
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const idNum = Number(id)
    const product = await prisma.product.findUnique({ where: { id: idNum } })

    if (!product) {
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    await Promise.all((product.images as string[]).map(deleteImage))

    await prisma.product.delete({ where: { id: idNum } })

    return NextResponse.json({ success: true })
}
