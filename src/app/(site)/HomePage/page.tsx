"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section
                id="homePage"
                className="w-full h-full min-h-dvh md:max-h-[90vh] overflow-hidden flex items-center justify-center px-8 md:px-4 relative"
            >
                <div className="flex flex-col md:flex-row items-center justify-around gap-10 w-full">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center gap-4 text-center md:text-left max-w-md">
                        <div>
                            <h1 className="text-4xl md:text-5xl uppercase tracking-widest font-semibold leading-tight font-[SaloonGirls]">
                                Black Angel Store
                            </h1>
                            <p className="text-lg md:text-3xl font-normal">
                                The Incredible Wear
                            </p>
                            <span className="block text-sm md:text-lg font-light text-gray-600">
                                Find Your Perfect Outfit Now!
                            </span>
                        </div>
                        <a
                            href="#productPage"
                            className="cursor-pointer w-fit mx-auto md:mx-0 flex items-center gap-1 group text-secondary mt-2"
                        >
                            See More
                            <ArrowRight
                                size={18}
                                className="group-hover:ml-2 transition-all duration-300"
                            />
                        </a>
                    </div>

                    {/* Right Image */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/img/hero2.png"
                            alt="Hero Image"
                            width={500}
                            height={500}
                            className="object-contain w-60 md:w-125"
                            priority
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
