import { headers } from "next/headers"

export async function requireAdmin() {
    const headerList = headers()
    const adminKey = (await headerList).get("x-admin-key")

    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
        throw new Error("Unauthorized")
    }
    return true
}