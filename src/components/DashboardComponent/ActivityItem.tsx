interface ActivityItemProps {
    icon: React.ReactNode
    title: string
    time: string
    color: string
}

export default function ActivityItem({ icon, title, time, color }: ActivityItemProps) {
    return (
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gray-100 ${color}`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    )
}
