import ProductCard from "@/components/ProductCard/ProductCard"

export default function Loading() {
    return (
        <section id="productPage">
            <div className="container mx-auto px-6 py-14">
                <h2 className="text-3xl font-semibold text-center tracking-wider uppercase mb-8">The Collection</h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCard key={i} isLoading />
                    ))}
                </div>
            </div>
        </section>
    )
}
