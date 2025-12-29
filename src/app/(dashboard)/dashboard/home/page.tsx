'use client'
import { useMemo } from "react"
import {
    ShirtIcon,
    Package,
    ShoppingCart,
    DollarSign,
    Eye,
    Star,
    Calendar,
    BarChart3,
    Users,
    TrendingUp
} from "lucide-react"
import { useSession } from "next-auth/react"
<<<<<<< HEAD
import { useDashboardStats } from "@/features/dashboard"
=======
import { useDashboardStats } from "@/hooks/dashboardHook"
>>>>>>> 970c784 (huge update)
import { MetricCard, ActivityItem, LoadingSkeleton, ErrorState } from "@/components/DashboardComponent"

export default function AdminHomePage() {
    const { data: session, status } = useSession()
    const { stats, loading, error } = useDashboardStats()

    // Generate stable view counts for products (must be before early returns)
    const productViewCounts = useMemo(() => {
        return [127, 89, 234, 156] // Mock view counts
    }, [])

    if (status === "loading") return <LoadingSkeleton />
    if (loading) return <LoadingSkeleton />

    if (error) {
        return <ErrorState />
    }

    // Extract data from stats
    const totalProducts = stats?.totalProducts || 0
    const activeProducts = stats?.activeProducts || 0
    const totalOrders = stats?.totalOrders || 0
    const totalRevenue = stats?.totalRevenue || 0
    const productGrowth = stats?.productGrowth || 0
    const averageOrderValue = stats?.averageOrderValue || 0
    const conversionRate = stats?.conversionRate || 0
    const customerSatisfaction = stats?.customerSatisfaction || 0
    const recentProducts = stats?.recentProducts || []
    const categoryStats = stats?.categoryStats || []

    // Calculate monthly growth
    const monthlyGrowth = {
        products: productGrowth,
        orders: 8.5, // Mock data since no real orders
        revenue: 15.2 // Mock data since no real revenue
    }

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="bg-linear-to-r from-(--primary) to-(--secondary) rounded-2xl p-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, {session?.user?.name || "User"}! 👋
                        </h1>
                        <p className="text-white/80 text-lg">
                            Here&apos;s what&apos;s happening with your fashion store today.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                            <p className="text-sm font-medium">{new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Products"
                    value={totalProducts.toString()}
                    icon={<ShirtIcon className="w-8 h-8" />}
                    color="bg-blue-500"
                    trend={`${monthlyGrowth.products > 0 ? '+' : ''}${monthlyGrowth.products}%`}
                    trendLabel="vs last month"
                />
                <MetricCard
                    title="Active Products"
                    value={activeProducts.toString()}
                    icon={<Package className="w-8 h-8" />}
                    color="bg-green-500"
                    trend={`${Math.round((activeProducts / totalProducts) * 100)}%`}
                    trendLabel="of total"
                />
                <MetricCard
                    title="Total Orders"
                    value={totalOrders.toString()}
                    icon={<ShoppingCart className="w-8 h-8" />}
                    color="bg-purple-500"
                    trend={`+${monthlyGrowth.orders}%`}
                    trendLabel="vs last month"
                />
                <MetricCard
                    title="Revenue"
                    value={`Rp ${totalRevenue.toLocaleString('id-ID')}`}
                    icon={<DollarSign className="w-8 h-8" />}
                    color="bg-emerald-500"
                    trend={`+${monthlyGrowth.revenue}%`}
                    trendLabel="vs last month"
                />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Categories Overview */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {categoryStats.slice(0, 5).map((category) => (
                            <div key={category.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{category.name}</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {category.productCount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        <ActivityItem
                            icon={<ShoppingCart className="w-4 h-4" />}
                            title="New order received"
                            time="2 hours ago"
                            color="text-green-500"
                        />
                        <ActivityItem
                            icon={<Package className="w-4 h-4" />}
                            title="Product restocked"
                            time="4 hours ago"
                            color="text-blue-500"
                        />
                        <ActivityItem
                            icon={<Users className="w-4 h-4" />}
                            title="New customer registered"
                            time="1 day ago"
                            color="text-purple-500"
                        />
                        <ActivityItem
                            icon={<Star className="w-4 h-4" />}
                            title="Product review received"
                            time="2 days ago"
                            color="text-yellow-500"
                        />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Avg. Order Value</span>
                            <span className="font-semibold">Rp {averageOrderValue.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Conversion Rate</span>
                            <span className="font-semibold">{conversionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Customer Satisfaction</span>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">{customerSatisfaction}</span>
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Active Products</span>
                            <span className="font-semibold">{activeProducts}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Products Preview */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
                    <button className="text-sm text-(--primary) hover:text-(--secondary) font-medium transition-colors">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recentProducts.slice(0, 4).map((product, index) => (
                        <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-400" />
                            </div>
                            <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <Eye className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{productViewCounts[index] || 0} views</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
