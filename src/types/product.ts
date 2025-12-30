// /types/product.ts

export interface Category {
    id: number
    name: string
    slug?: string
}

/**
 * Product utama (hasil fetch dari API / Prisma)
 */
export interface Product {
    id: number
    name: string
    slug: string
    description: string | null
    price: number

    /**
     * images dari DB:
     * - idealnya string[]
     * - tapi kamu sudah handle kemungkinan JSON string
     */
    images: string[]

    isActive: boolean

    categoryId: number | null
    category?: Category | null

    createdAt?: string
    updatedAt?: string
}

/**
 * Untuk create product (admin add)
 */
export interface ProductCreateData {
    name: string
    slug: string
    description?: string
    price: number
    images: string[]
    categoryId: number
    isActive: boolean
}

/**
 * Untuk update product (admin edit)
 * images bisa FileList (upload) atau string[]
 */
export interface ProductUpdateData {
    name?: string
    slug?: string
    description?: string
    price?: number
    images?: FileList | string[]
    categoryId?: number
    isActive?: boolean
}

/**
 * Response pagination public product
 */
export interface ProductPaginationResponse {
    products: Product[]
    page: number
    totalPages: number
    totalItems: number
}

export interface ProductListResponse {
    products: Product[]
    page: number
    totalPages: number
    totalItems: number
}