export default function LoadingSkeleton() {
    return (
        <div className="space-y-8">
            <div className="bg-gray-200 rounded-2xl p-8 animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-xl p-6 animate-pulse">
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-20"></div>
                                <div className="h-6 bg-gray-300 rounded w-16"></div>
                            </div>
                            <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
