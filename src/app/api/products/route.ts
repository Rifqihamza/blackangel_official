import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/requireAdmin"
import { NextResponse } from "next/server"

export async function GET() {
    const products = await prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
    })

    return NextResponse.json(products)
}

export async function POST(req: Request) {
    await requireAdmin()

    const data = await req.json()
    const product = await prisma.product.create({ data })

    return NextResponse.json(product)
}
