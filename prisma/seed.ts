import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    // ===== ADMIN USER =====
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

    // ===== CATEGORIES =====
    const categories = await Promise.all(
        ["T-Shirt", "Jacket", "Hoodie", "Pants"].map(name =>
            prisma.category.upsert({
                where: { name },
                update: {},
                create: { name },
            })
        )
    )

    // Helper
    const getCategoryId = (name: string) =>
        categories.find(c => c.name === name)!.id

    // ===== PRODUCTS DATA (50 ITEMS) =====
    const products = Array.from({ length: 50 }).map((_, i) => {
        const index = i + 1
        const category =
            i % 4 === 0 ? "T-Shirt" :
                i % 4 === 1 ? "Jacket" :
                    i % 4 === 2 ? "Hoodie" :
                        "Pants"

        return {
            name: `Black Angel ${category} ${index}`,
            slug: `black-angel-${category.toLowerCase()}-${index}`,
            description: `Premium ${category.toLowerCase()} Black Angel edition ${index}`,
            price: 120000 + (i * 5000),
            images: [
                `/img/${category.toLowerCase()}.png`,
                `/img/${category.toLowerCase()}.png`,
            ],
            categoryId: getCategoryId(category),
        }
    })

    // ===== INSERT PRODUCTS =====
    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        })
    }

    console.log("✅ Seed completed: Admin + Categories + 50 Products")
}

main()
    .then(() => prisma.$disconnect())
    .catch(err => {
        console.error(err)
        prisma.$disconnect()
        process.exit(1)
    })
