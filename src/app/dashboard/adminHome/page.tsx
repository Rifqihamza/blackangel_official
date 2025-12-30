'use client'

import { useSession } from "next-auth/react"
import { MetricCard } from "@/components/DashboardComponent"
import { Shirt, Folder, Package } from "lucide-react"

export default function AdminHome() {
    const { data: session } = useSession()

    return (
        <section className="space-y-8 p-6">
            {/* Banner */}
            <div className="bg-linear-to-r from-(--primary) to-(--muted) flex flex-col items-start justify-center w-full h-50 p-6 rounded-xl shadow-md">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Welcome back, {session?.user?.name}
                </h1>
                <p className="text-white/80 mt-2">
                    Here`s a quick overview of your store performance.
                </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Products"
                    value="120"
                    icon={<Shirt size={24} />}
                    color="bg-blue-500"
                    trend="+12%"
                    trendLabel="from last month"
                />
                <MetricCard
                    title="Categories"
                    value="8"
                    icon={<Folder size={24} />}
                    color="bg-green-500"
                    trend="+2"
                    trendLabel="new categories"
                />
                <MetricCard
                    title="Orders"
                    value="120"
                    icon={<Package size={24} />}
                    color="bg-purple-500"
                    trend="+25%"
                    trendLabel="from last week"
                />
            </div>
        </section>
    )
}
