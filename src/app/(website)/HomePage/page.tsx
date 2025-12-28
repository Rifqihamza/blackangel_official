import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
    return (
        <section id="homePage" className="w-full min-h-screen py-6">
            {/* CONTAINER */}
            <div className="px-4 sm:px-6 space-y-6 container mx-auto">

                {/* ===== HERO GRID ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT TEXT */}
                    <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 flex flex-col justify-between">
                        <div className="space-y-8 md:space-y-14">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-(--primary)">
                                Express Your Vibe <br />
                                Find Your Outfit <br />
                                Now!
                            </h1>

                            <p className="max-w-md text-(--primary)/50 text-sm leading-relaxed">
                                Discover the latest trends & express your style effortlessly.
                                Shop exclusive collections with premium designs, just for you.
                            </p>

                            <Link
                                href="#collectionPage"
                                className="flex items-center gap-3 w-fit"
                            >
                                <div className="bg-(--primary) text-white px-5 py-2 md:px-6 md:py-3 rounded-full text-sm font-medium">
                                    Shop now
                                </div>
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-(--primary) ring-4 ring-(--primary) text-(--primary) flex items-center justify-center">
                                    <ArrowRight size={26} className="rotate-45" />
                                </div>
                            </Link>
                        </div>

                        <div className="pt-10">
                            <h2 className="text-(--primary) text-2xl md:text-3xl font-semibold">
                                Black Angel Store
                            </h2>
                            <p className="text-(--secondary) text-sm font-medium">
                                The Incredible Wear
                            </p>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative bg-white shadow-xl rounded-3xl overflow-hidden aspect-square md:aspect-square">
                        <Image
                            src="/img/model2.png"
                            alt="Fashion Model"
                            width={800}
                            height={800}
                            className="w-full object-contain -translate-y-1/4 scale-120"
                            priority
                        />
                    </div>
                </div>

                {/* ===== BOTTOM BENTO ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {/* Box 1 */}
                    <div className="relative aspect-video bg-white shadow-xl rounded-3xl overflow-hidden">
                        <Image
                            src="/img/model1.png"
                            alt="Model Outfit"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Box 2 */}
                    <div className="relative aspect-video bg-white shadow-xl rounded-3xl overflow-hidden">
                        <Image
                            src="/img/clothes.png"
                            alt="Clothes"
                            fill
                            className="object-cover scale-125"
                        />
                    </div>

                    {/* Box 3 – CTA */}
                    <div className="aspect-video bg-white shadow-xl rounded-3xl p-6 md:p-10 flex items-center justify-center">
                        <div className="space-y-4 w-full text-center">
                            <h3 className="text-xl md:text-2xl font-semibold text-(--primary)">
                                Models wearing <br /> full outfits
                            </h3>
                            <button className="border border-black px-5 py-2 rounded-full text-sm">
                                Explore more
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
