import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const category = await prisma.category.upsert({
        where: { name: "T-Shirt" },
        update: {},
        create: { name: "T-Shirt" },
    })

    await prisma.product.createMany({
        data: [
            {
                name: "Black Angel T-Shirt",
                slug: "black-angel-tshirt",
                description: "Kaos hitam premium Black Angel",
                price: 150000,
                images: ["/img/placeholder.jpg"],
                categoryId: category.id,
            },
            {
                name: "White Angel T-Shirt",
                slug: "white-angel-tshirt",
                description: "Kaos putih eksklusif Black Angel",
                price: 145000,
                images: ["/img/placeholder.jpg"],
                categoryId: category.id,
            },
        ],
    })
}

main()
    .then(() => prisma.$disconnect())
    .catch(e => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })
