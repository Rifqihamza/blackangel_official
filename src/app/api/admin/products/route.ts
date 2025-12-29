import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { requireAdmin } from "@/server/requireAdmin";
import { createProductSchema } from "@/schemas/product.schema";
import { paginationQuerySchema } from "@/schemas/pagination.schema";
import { withRateLimit, apiRateLimitOptions } from "@/server/rateLimit";
import { Prisma } from "@prisma/client";

async function handler(req: Request) {
    await requireAdmin();

    if (req.method === "GET") {
        const parsed = paginationQuerySchema.safeParse(
            Object.fromEntries(new URL(req.url).searchParams)
        );

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { page, limit, search, filterActive, categoryId } = parsed.data;
        const skip = (page - 1) * limit;

        const where: Prisma.ProductWhereInput = {};

        if (search) where.name = { contains: search, mode: "insensitive" };
        if (filterActive !== "all") where.isActive = filterActive === "active";
        if (categoryId) where.categoryId = categoryId;

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: { category: true },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);

        return NextResponse.json({
            data: products,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    }

    if (req.method === "POST") {
        const body = createProductSchema.parse(await req.json());
        const product = await prisma.product.create({ data: body });
        return NextResponse.json(product, { status: 201 });
    }

    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export const GET = withRateLimit(handler, apiRateLimitOptions);
export const POST = withRateLimit(handler, apiRateLimitOptions);
