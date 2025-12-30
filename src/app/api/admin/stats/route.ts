import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
        totalProducts,
        activeProducts,
        totalCategories,
        productsThisMonth,
        productsLastMonth,
        recentProducts,
        categoryStats,
    ] = await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { isActive: true } }),
        prisma.category.count(),
        prisma.product.count({
            where: { createdAt: { gte: startOfMonth } },
        }),
        prisma.product.count({
            where: {
                createdAt: {
                    gte: startOfLastMonth,
                    lt: endOfLastMonth,
                },
            },
        }),
        prisma.product.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { category: true },
        }),
        prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
            orderBy: {
                products: { _count: "desc" },
            },
            take: 5,
        }),
    ])

    const productGrowth =
        productsLastMonth > 0
            ? ((productsThisMonth - productsLastMonth) / productsLastMonth) * 100
            : 0

    return NextResponse.json({
        totalProducts,
        activeProducts,
        totalCategories,
        productGrowth: Math.round(productGrowth * 100) / 100,
        recentProducts,
        categoryStats: categoryStats.map(cat => ({
            id: cat.id,
            name: cat.name,
            productCount: cat._count.products,
        })),
    })
}
