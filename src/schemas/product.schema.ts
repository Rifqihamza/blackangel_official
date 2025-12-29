import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(2),
    slug: z.string(),
    description: z.string().optional(),
    price: z.number().positive(),
    images: z.array(z.string().url()),
    categoryId: z.number(),
    isActive: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();
