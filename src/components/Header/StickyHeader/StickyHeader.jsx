"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function StickyHeader() {
    const t = useTranslations("Header");
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

    if (isHome && !isFixed) return null;

    return (
        <header
            className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-50 animate-in fade-in slide-in-from-top-1 duration-300"
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

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />

                    <Link
                        href="https://wa.me/994552904045?text=Hi, I'm interested in renting a place. Can you assist me with the options?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold hover:text-white/75 bg-white/15 hover:bg-white/25 border border-white/10 backdrop-blur-md uppercase text-white transition-all"
                        aria-label={t("contactWhatsapp")}
                    >
                        {t("contact")}
                    </Link>
                </div>
            </div>
        </header>
    );
}