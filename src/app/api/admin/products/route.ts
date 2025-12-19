import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/requireAdmin";
import { z } from "zod"

export async function GET() {
    try {
        await requireAdmin()

        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json(products)
    } catch {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
}

const createProductSchema = z.object({
    name: z.string().min(2),
    slug: z.string(),
    description: z.string().optional(),
    price: z.number().positive(),
    images: z.array(z.string()),
    categoryId: z.number(),
})

export async function POST(req: Request) {
    try {
        await requireAdmin()

        const body = await req.json()
        const data = createProductSchema.parse(body)

        const product = await prisma.product.create({
            data: {
                ...data,
                images: data.images,
            },
        })
        return NextResponse.json(product, { status: 201 })
    } catch (err) {
        return NextResponse.json(
            { message: "Invalid Request", detail: String(err) },
            { status: 400 }
        )
    }
}
