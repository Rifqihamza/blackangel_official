"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section
                id="homePage"
                className="w-full h-full min-h-dvh md:max-h-[90vh] overflow-hidden flex items-center justify-center px-8 md:px-4 mt-10 md:mt-0"
            >
                <div className="flex flex-col md:flex-row items-center justify-around gap-10 w-full">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center gap-4 text-center md:text-left max-w-md">
                        <div>
                            <h1 className="text-2xl md:text-4xl uppercase font-semibold leading-tight tracking-wide text-primary">
                                Black Angel Store
                            </h1>
                            <p className="text-lg md:text-2xl font-normal">
                                The Incredible Wear
                            </p>
                            <span className="text-sm md:text-md font-light">
                                Find Your Perfect Outfit Now!
                            </span>
                        </div>
                        <a
                            href="#productPage"
                            className="cursor-pointer w-fit mx-auto md:mx-0 flex items-center gap-1 group mt-2 hover:text-primary duration-300"
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
                            className="object-contain w-60 md:w-100"
                            priority
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
