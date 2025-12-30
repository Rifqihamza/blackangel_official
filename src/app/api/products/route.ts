export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page") ?? 1)
    const limit = 8
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.product.findMany({
            where: { isActive: true },
            include: { category: true },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where: { isActive: true } }),
    ])

    return Response.json({
        data,
        meta: { page, total, totalPages: Math.ceil(total / limit) },
    })
}
