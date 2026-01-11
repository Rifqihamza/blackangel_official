import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    // =========================
    // ADMIN USER
    // =========================
    const hashedPassword = await bcrypt.hash("1tm1tr4101101", 10)

    await prisma.users.upsert({
        where: { email: "admin@blackangel.com" },
        update: {},
        create: {
            email: "admin@blackangel.com",
            name: "Admin",
            password: hashedPassword,
            role: "ADMIN",
        },
    })

    // =========================
    // CATEGORIES
    // =========================
    const categoryNames = ["T-Shirt", "Jacket", "Hoodie", "Pants"]

    const categories = await Promise.all(
        categoryNames.map(name =>
            prisma.category.upsert({
                where: { name },
                update: {},
                create: { name },
            })
        )
    )

    const getCategoryId = (name: string) =>
        categories.find(c => c.name === name)!.id

    // =========================
    // PRODUCTS
    // =========================
    const products = Array.from({ length: 50 }).map((_, i) => {
        const index = i + 1
        const category =
            i % 4 === 0
                ? "T-Shirt"
                : i % 4 === 1
                    ? "Jacket"
                    : i % 4 === 2
                        ? "Hoodie"
                        : "Pants"

        const categorySlug = category.toLowerCase().replace(/\s+/g, "-")

        return {
            name: `Black Angel ${category} ${index}`,
            slug: `black-angel-${categorySlug}-${index}`,
            description: `Premium ${categorySlug} Black Angel edition ${index}`,
            price: 120_000 + i * 5_000,
            images: [
                `/img/${categorySlug}.png`,
                `/img/${categorySlug}.png`,
            ], // memastikan JSON
            isActive: true,
            categoryId: getCategoryId(category),
        }
    })

    // =========================
    // INSERT PRODUCTS
    // =========================
    await Promise.all(
        products.map(product =>
            prisma.product.upsert({
                where: { slug: product.slug },
                update: {},
                create: product,
            })
        )
    )

    console.log("✅ Seed completed: Admin, Categories, 50 Products")
}

main()
    .then(() => prisma.$disconnect())
    .catch(err => {
        console.error("❌ Seed error:", err)
        prisma.$disconnect()
        process.exit(1)
    })
