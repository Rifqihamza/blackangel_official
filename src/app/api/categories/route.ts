import { NextResponse } from "next/server";
<<<<<<< HEAD
import { prisma } from "@/server/prisma";
=======
import { prisma } from "@/lib/prisma";
>>>>>>> 970c784 (huge update)

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return NextResponse.json({ data: categories });
}
