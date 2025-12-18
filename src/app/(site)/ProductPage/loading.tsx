import ProductCard from "@/components/ProductCard/ProductCard"

export default function Loading() {
    return (
        <section id="productPage">
            <div className="container mx-auto px-6 py-14">
                <h1 className="text-2xl font-semibold mb-8">Our Products</h1>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCard key={i} isLoading />
                    ))}
                </div>
            </div>
        </section>
    )
}
