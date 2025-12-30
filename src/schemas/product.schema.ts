import { z } from "zod"

export const productCreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    price: z.number().int().positive(),
    images: z.array(z.string().url()).default([]),
    categoryId: z.number(),
    isActive: z.boolean().default(true),
})

export const productUpdateSchema = productCreateSchema.partial()
