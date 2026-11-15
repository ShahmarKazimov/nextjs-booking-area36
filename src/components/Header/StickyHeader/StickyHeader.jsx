"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import WishlistLink from "../../Wishlist/WishlistLink";
import HeaderNav from "../HeaderNav";
import MobileMenu from "../MobileMenu";

export default function StickyHeader() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isFixed, setIsFixed] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            setIsFixed(true);
            return;
        }

        const handleScroll = () => {
            setIsFixed(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    // Header həmişə DOM-dadır; görünmə/gizlənmə transform + opacity ilə animasiya olunur.
    return (
        <header
            className={`fixed top-0 left-0 w-full bg-[#1c1a17]/90 backdrop-blur-md border-b border-white/10 shadow-md transition-all duration-500 ease-out z-50 ${
                isFixed
                    ? "translate-y-0 opacity-100 visible"
                    : "-translate-y-full opacity-0 invisible pointer-events-none"
            }`}
            aria-label="Sticky Navigation"
            aria-hidden={!isFixed}
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

                <HeaderNav />

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <WishlistLink />
                        <LanguageSwitcher />
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
}