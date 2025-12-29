import { z } from "zod";

export const paginationQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(8),
    search: z.string().optional().default(""),
    filterActive: z.enum(["active", "inactive", "all"]).default("active"),
    categoryId: z.coerce.number().optional(),
});
