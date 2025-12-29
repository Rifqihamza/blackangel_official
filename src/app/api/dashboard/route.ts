import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
        // Get total products count
        const totalProducts = await prisma.product.count()

        // Get active products count
        const activeProducts = await prisma.product.count({
            where: { isActive: true }
        })

        // Get total categories count
        const totalCategories = await prisma.category.count()

        // Get products created this month for growth calculation
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const productsThisMonth = await prisma.product.count({
            where: {
                createdAt: {
                    gte: startOfMonth
                }
            }
        })

        const productsLastMonth = await prisma.product.count({
            where: {
                createdAt: {
                    gte: startOfLastMonth,
                    lt: endOfLastMonth
                }
            }
        })

        // Calculate growth percentage
        const productGrowth = productsLastMonth > 0
            ? ((productsThisMonth - productsLastMonth) / productsLastMonth) * 100
            : 0

        // Get recent products (last 4)
        const recentProducts = await prisma.product.findMany({
            take: 4,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        })

        // Get top categories with product counts
        const categoryStats = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: {
                products: {
                    _count: 'desc'
                }
            },
            take: 5
        })

        // Mock data for orders and revenue (since no Order model exists)
        // In a real app, you'd have Order and OrderItem models
        const totalOrders = 156
        const totalRevenue = 28500000

        // Calculate some additional metrics
        const averageOrderValue = totalRevenue / totalOrders
        const conversionRate = 3.2 // Mock conversion rate
        const customerSatisfaction = 4.8 // Mock rating

        return NextResponse.json({
            success: true,
            data: {
                totalProducts,
                activeProducts,
                totalCategories,
                totalOrders,
                totalRevenue,
                productGrowth: Math.round(productGrowth * 100) / 100,
                averageOrderValue: Math.round(averageOrderValue),
                conversionRate,
                customerSatisfaction,
                recentProducts: recentProducts.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    images: product.images,
                    isActive: product.isActive,
                    category: product.category,
                    createdAt: product.createdAt
                })),
                categoryStats: categoryStats.map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    productCount: cat._count.products
                }))
            }
        })

    } catch (error) {
        console.error('Dashboard stats error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dashboard data' },
            { status: 500 }
        )
    }
}
