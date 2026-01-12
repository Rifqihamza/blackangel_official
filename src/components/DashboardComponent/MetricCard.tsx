import { TrendingUp } from "lucide-react"

interface MetricCardProps {
    title: string
    value: string
    icon: React.ReactNode
    bgColor: string
    borderColor: string
    color: string
    trend: string
    trendLabel: string
}

export default function MetricCard({ title, value, icon, bgColor, borderColor, color, trend, trendLabel }: MetricCardProps) {
    return (
        <div className={`${bgColor} rounded-xl shadow-sm ${borderColor} p-6 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-700">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{trend}</span>
                        <span className="text-xs text-gray-500">{trendLabel}</span>
                    </div>
                </div>
                <div className={`p-3 rounded-xl ${color} text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}
