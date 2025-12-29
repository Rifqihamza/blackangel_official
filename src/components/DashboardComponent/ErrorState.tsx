export default function ErrorState() {
    return (
        <div className="flex items-center justify-center min-h-100">
            <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-500 text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-gray-600">Unable to load dashboard data. Please try again later.</p>
            </div>
        </div>
    )
}
