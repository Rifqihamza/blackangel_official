import { NextResponse } from "next/server";
<<<<<<< HEAD
import { prisma } from "@/server/prisma";
import { requireAdmin } from "@/server/requireAdmin";
import { updateProductSchema } from "@/schemas/product.schema";
=======
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { updateProductSchema } from "@/lib/validators/product.schema";
>>>>>>> 970c784 (huge update)
import { z } from "zod";

const idSchema = z.coerce.number().positive();

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    await requireAdmin();

    const id = idSchema.parse(params.id);
    const data = updateProductSchema.parse(await req.json());

    const product = await prisma.product.update({
        where: { id },
        data,
    });

    return NextResponse.json(product);
}

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } }
) {
    await requireAdmin();

    const id = idSchema.parse(params.id);

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
}
