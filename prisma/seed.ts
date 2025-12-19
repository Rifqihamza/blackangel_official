import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    // Create admin user
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

    const category = await prisma.category.upsert({
        where: { name: "T-Shirt" },
        update: {},
        create: { name: "T-Shirt" },
    })

    await prisma.product.upsert({
        where: { slug: "black-angel-tshirt" },
        update: {},
        create: {
            name: "Black Angel T-Shirt",
            slug: "black-angel-tshirt",
            description: "Kaos hitam premium Black Angel",
            price: 150000,
            images: ["/img/placeholder.jpg"],
            categoryId: category.id,
        },
    })

    await prisma.product.upsert({
        where: { slug: "white-angel-tshirt" },
        update: {},
        create: {
            name: "White Angel T-Shirt",
            slug: "white-angel-tshirt",
            description: "Kaos putih eksklusif Black Angel",
            price: 145000,
            images: ["/img/placeholder.jpg"],
            categoryId: category.id,
        },
    })
}

main()
    .then(() => prisma.$disconnect())
    .catch(e => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })
