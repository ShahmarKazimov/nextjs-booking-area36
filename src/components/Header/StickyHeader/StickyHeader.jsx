"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function StickyHeader() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isFixed, setIsFixed] = useState(!isHome);

    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            setIsFixed(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    if (isHome && !isFixed) return null;

    return (
        <header
            className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-50"
            aria-label="Sticky Navigation"
        >
            <div className="flex items-center justify-between py-2 px-4 xl:px-0 max-w-7xl mx-auto min-h-[81px]">
                <Link
                    href="/"
                    aria-label="Area36 - Back to homepage"
                    title="Area36"
                    className="flex items-center gap-x-2"
                >
                    {/* SVG üçün next/image lazım deyil — img tagi istifadə et */}
                    <img
                        src="/images/ui/logo.svg"
                        alt="Area36 Logo"
                        width={120}
                        height={60}
                        className="object-contain"
                    />
                </Link>

                {/* Link içində button olmaz — Link özü styled düymə kimi işləyir */}
                <Link
                    href="https://wa.me/994552904045?text=Hi, I'm interested in renting a place. Can you assist me with the options?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer rounded-lg py-3.5 text-md font-semibold hover:text-white/75 uppercase text-white transition-all"
                    aria-label="Contact Area36 on WhatsApp"
                >
                    Contact
                </Link>
            </div>
        </header>
    );
}