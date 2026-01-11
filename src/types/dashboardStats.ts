import { Product } from './product'

export type DashboardStats = {
    totalProducts: number
    activeProducts: number
    totalCategories: number
    productGrowth: number
    recentProducts: Product[]
    categoryStats: {
        id: number
        name: string
        productCount: number
    }[]
}
