import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma";

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return NextResponse.json({ data: categories });
}
