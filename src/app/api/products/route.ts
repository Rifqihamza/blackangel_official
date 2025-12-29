import { NextResponse } from "next/server";
<<<<<<< HEAD
import { prisma } from "@/server/prisma";
import { paginationQuerySchema } from "@/schemas/pagination.schema";
import { Prisma } from "@prisma/client";
import { withRateLimit, apiRateLimitOptions } from "@/server/rateLimit";
=======
import { prisma } from "@/lib/prisma";
import { paginationQuerySchema } from "@/lib/validators/pagination.schema";
import { Prisma } from "@prisma/client";
import { withRateLimit, apiRateLimitOptions } from "@/lib/rateLimit";
>>>>>>> 970c784 (huge update)

async function handler(req: Request) {
    try {
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

        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }

        if (filterActive !== "all") {
            where.isActive = filterActive === "active";
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: { category: true },
                orderBy: { createdAt: "asc" },
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);

        return NextResponse.json({
            data: products,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("PRODUCT API ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const GET = withRateLimit(handler, apiRateLimitOptions);
