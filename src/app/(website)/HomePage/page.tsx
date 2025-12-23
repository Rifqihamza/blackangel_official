import Image from "next/image";

export default function HomePage() {
    return (
        <section
            id="homePage"
            className="relative w-full h-dvh overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-dvh">
                <Image
                    src="/img/person.png"
                    alt="Hero Model"
                    fill
                    priority
                    className="w-full h-full object-cover"
                />
                {/* Overlay biar teks kebaca */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center text-white px-6">
                <p className="text-5xl md:text-6xl tracking-widest font-[Tangerine]">
                    The Incredible Wear
                </p>
                <span className="mt-3 text-lg md:text-xl tracking-wider">
                    Find Your Perfect Outfit Now!
                </span>
            </div>
        </section>
    );
}
