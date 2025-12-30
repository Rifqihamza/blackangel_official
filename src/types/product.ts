export type Category = {
    id: number
    name: string
}

export type Product = {
    id: number
    name: string
    slug: string
    description?: string | null
    price: number
    images: string[]
    isActive: boolean
    categoryId: number
    category?: Category
    createdAt: string
    updatedAt: string
}
