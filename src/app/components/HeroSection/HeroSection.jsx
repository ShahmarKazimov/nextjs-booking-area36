"use client";
import React from 'react';
import Image from 'next/image';
import { heroBackgroundImage } from '../../data/carouselImages';

const HeroSection = () => {
    return (
        <section
            className="relative sm:-top-[5.1rem] -top-[9rem] left-0 w-full h-[550px] sm:h-[720px] z-[-1] bg-black"
            aria-label="Hero Section"
        >
            <div
                className="relative w-full h-[620px] sm:h-[720px] bg-black"
                style={{ backgroundColor: '#000000' }}
            >
                <Image
                    src={heroBackgroundImage}
                    alt="Area36 Hero - Stunning travel destinations and breathtaking landscapes"
                    fill
                    priority
                    className="object-cover brightness-50"
                    sizes="100vw"
                    quality={85}
                    style={{ backgroundColor: '#000000' }}
                />
            </div>

            {/* Enhanced Multi-layer Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" aria-hidden="true"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" aria-hidden="true"></div>

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-slow"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-float-medium"></div>
                <div className="absolute bottom-1/4 left-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-fast"></div>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                <div className="text-center mt-20 space-y-6 max-w-4xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl animate-fade-in-up">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            Welcome to Area36
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl drop-shadow-lg opacity-90 animate-fade-in-up animation-delay-300">
                        Experience the beauty of Qafqaz and create unforgettable memories in our luxurious chalets.
                    </p>
                    <div className="flex justify-center space-x-8 mt-8 animate-fade-in-up animation-delay-600" role="banner">
                        <div className="text-center">
                            <div className="text-3xl font-bold" aria-label="50 plus destinations">10+</div>
                            <div className="text-sm opacity-80">Destinations</div>
                        </div>
                        <div className="w-px h-12 bg-white/30" aria-hidden="true"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold" aria-label="Over 1 million happy travelers">1K+</div>
                            <div className="text-sm opacity-80">Happy Travelers</div>
                        </div>
                        <div className="w-px h-12 bg-white/30" aria-hidden="true"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold" aria-label="4.9 out of 5 rating">4.9</div>
                            <div className="text-sm opacity-80">Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;