export default function ProductDetailSkeleton() {
    return (
        <main className="h-[90vh] max-w-7xl mx-auto py-30 px-6 animate-pulse">
            {/* Back button */}
            <div className="h-5 w-24 bg-gray-200 rounded mb-6" />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Image */}
                <div className="col-span-1">
                    <div className="w-full h-96 bg-gray-200 rounded-xl" />
                </div>

                {/* Detail */}
                <div className="col-span-1 space-y-4">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-7 w-3/4 bg-gray-200 rounded" />
                    <div className="h-8 w-1/2 bg-gray-200 rounded" />

                    <div className="space-y-2 pt-2">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-11/12 bg-gray-200 rounded" />
                        <div className="h-4 w-10/12 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </main>
    )
}
