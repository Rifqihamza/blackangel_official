'use client'

import { useSession } from "next-auth/react"
import { MetricCard } from "@/components/DashboardComponent"
import { Shirt, Folder, Package } from "lucide-react"

export default function AdminHome() {
    const { data: session } = useSession()

    return (
        <section className="space-y-8">
            {/* Banner */}
            <div className="py-6 px-4 bg-linear-to-r from-(--primary) to-(--muted) text-white rounded-xl">
                <div className="hero-content">
                    <div className="w-full">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Welcome back, {session?.user?.name}👋🏻
                        </h1>
                        <p className="text-primary-content/80">
                            Here`s a quick overview of your store performance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Products"
                    value="120"
                    icon={<Shirt size={24} />}
                    bgColor="bg-info/10"
                    borderColor="border-2 border-info"
                    color="bg-info"
                    trend="+12%"
                    trendLabel="from last month"
                />
                <MetricCard
                    title="Categories"
                    value="8"
                    icon={<Folder size={24} />}
                    bgColor="bg-success/10"
                    borderColor="border-2 border-success"
                    color="bg-success"
                    trend="+2"
                    trendLabel="new categories"
                />
                <MetricCard
                    title="Orders"
                    value="120"
                    icon={<Package size={24} />}
                    bgColor="bg-warning/10"
                    borderColor="border-2 border-warning"
                    color="bg-warning"
                    trend="+25%"
                    trendLabel="from last week"
                />
            </div>
        </section>
    )
}
