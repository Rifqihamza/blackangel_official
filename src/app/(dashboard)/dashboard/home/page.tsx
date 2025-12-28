'use client'
import { useSession } from "next-auth/react"

export default function AdminHomePage() {
    const { data: session, status } = useSession()

    if (status === "loading") return <p>Loading...</p>

    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-semibold">
                Welcome back, {session?.user.name} 👋
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-white shadow">
                    <h2 className="text-sm text-gray-500">Total Products</h2>
                    <p className="text-2xl font-bold">120</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow">
                    <h2 className="text-sm text-gray-500">Categories</h2>
                    <p className="text-2xl font-bold">8</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow">
                    <h2 className="text-sm text-gray-500">Orders</h2>
                    <p className="text-2xl font-bold">56</p>
                </div>
            </div>
        </section>
    )
}
