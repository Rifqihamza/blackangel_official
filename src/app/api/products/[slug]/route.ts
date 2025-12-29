import { NextResponse } from "next/server";
<<<<<<< HEAD
import { prisma } from "@/server/prisma";
=======
import { prisma } from "@/lib/prisma";
>>>>>>> 970c784 (huge update)
import { z } from "zod";

const slugSchema = z.object({
    slug: z.string().min(1),
});

export async function GET(
    _: Request,
    { params }: { params: { slug: string } }
) {
    const parsed = slugSchema.safeParse(params);
    if (!parsed.success) {
        return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
        where: { slug: parsed.data.slug },
        include: { category: true },
    });

    if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
