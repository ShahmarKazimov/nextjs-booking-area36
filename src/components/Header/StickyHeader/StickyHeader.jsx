"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function StickyHeader() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isFixed, setIsFixed] = useState(!isHome);

    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            setIsFixed(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    if (isHome && !isFixed) return null;


    return (
        <header
            className={`fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-50`}
            role="banner"
            aria-label="Sticky Navigation"
        >
            <div className="flex items-center justify-between py-2 pl-[0.7rem] pr-[1.1rem] xl:px-10">
                <div className="flex items-center group">
                    <Link
                        href="/"
                        aria-label="Area36"
                        title="Area36"
                        className="flex items-center group gap-x-2"
                    >
                        <figure className="flex items-center m-0">
                            <Image
                                src="/images/ui/logo.svg"
                                alt="Area36 Logo"
                                width={120}
                                height={60}
                                priority
                                className="w-[120px] h-[60px]"
                            />
                            <figcaption className="sr-only">Area36 Brand Logo</figcaption>
                        </figure>
                    </Link>
                </div>
                <Link
                    href="https://wa.me/994504271987?text=Hello, I would like to get more information about this house."
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="cursor-pointer w-full rounded-lg py-3.5 text-md font-semibold hover:text-white/75 uppercase text-white transition-all">
                        Contact
                    </button>
                </Link>
            </div>
        </header>
    );
}
