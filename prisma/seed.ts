import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Seeding database...")

    // 🔹 CATEGORY
    const categories = await prisma.category.createMany({
        data: [
            { name: "T-Shirt" },
            { name: "Hoodie" },
            { name: "Accessories" },
        ],
        skipDuplicates: true,
    })

    const allCategories = await prisma.category.findMany()

    // 🔹 PRODUCT
    await prisma.product.createMany({
        data: [
            {
                name: "Black Angel T-Shirt",
                slug: "black-angel-tshirt",
                description: "Premium cotton T-Shirt",
                price: 150000,
                images: JSON.stringify([
                    "/products/tshirt-1.png",
                ]),
                isActive: true,
                categoryId: allCategories[0].id,
            },
            {
                name: "Black Angel Hoodie",
                slug: "black-angel-hoodie",
                description: "Oversized hoodie",
                price: 350000,
                images: JSON.stringify([
                    "/products/hoodie-1.png",
                ]),
                isActive: true,
                categoryId: allCategories[1].id,
            },
            {
                name: "Black Angel Cap",
                slug: "black-angel-cap",
                description: "Adjustable cap",
                price: 100000,
                images: JSON.stringify([
                    "/products/cap-1.png",
                ]),
                isActive: true,
                categoryId: allCategories[2].id,
            },
        ],
    })

    console.log("✅ Seed selesai")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
