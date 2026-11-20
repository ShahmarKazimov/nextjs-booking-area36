"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import SantaHat from "../Winter/SantaHat";
import { useWishlist } from "../Wishlist/WishlistProvider";

const WA_URL =
    "https://wa.me/994552904045?text=Hi, I'm interested in renting a place. Can you assist me with the options?";

// Rendered inside a positioned <header>; the panel drops down under it (md:hidden)
export default function MobileMenu() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const { slugs } = useWishlist();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    // Close on route change and on Escape
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        // Lock page scroll while the full-screen menu is open
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    const close = () => setOpen(false);
    const item =
        "flex items-center justify-between px-4 py-3.5 text-base font-medium border-b border-white/10 last:border-b-0 transition-colors";
    const active = (p) => (pathname === p ? "text-white bg-white/5" : "text-[#ebe7d8] hover:bg-white/5 hover:text-white");

    return (
        <div className="md:hidden" ref={rootRef}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? t("closeMenu") : t("openMenu")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-[#ebe7d8] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
                {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>

            {open && createPortal(
                <>
                    <nav
                        id="mobile-menu"
                        aria-label="Mobile"
                        className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#1c1a17]"
                    >
                        <div className="flex items-center justify-between px-4 min-h-[81px] shrink-0 border-b border-white/10">
                            <Link href="/" onClick={close} aria-label="Area36 - Luxury Chalets & Villas" title="Area36">
                                <span className="relative block">
                                    <img
                                        src="/images/ui/logo.svg"
                                        alt="Area36 Logo"
                                        width={120}
                                        height={60}
                                        className="object-contain w-[100px] h-auto"
                                    />
                                    <SantaHat />
                                </span>
                            </Link>
                            <button
                                type="button"
                                onClick={close}
                                aria-label={t("closeMenu")}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-[#ebe7d8] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
                            <Link href="/" onClick={close} className={`${item} ${active("/")}`}>
                                {t("home")}
                            </Link>
                            <Link href="/#villas" onClick={close} className={`${item} text-[#ebe7d8] hover:bg-white/5 hover:text-white`}>
                                {t("villas")}
                            </Link>
                            <Link href="/wishlist" onClick={close} className={`${item} ${active("/wishlist")}`}>
                                <span>{t("wishlist")}</span>
                                {slugs.length > 0 && (
                                    <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-[#ebe7d8] px-1.5 text-[11px] font-bold text-[#1c1a17]">
                                        {slugs.length}
                                    </span>
                                )}
                            </Link>
                            <Link href="/about" onClick={close} className={`${item} ${active("/about")}`}>
                                {t("about")}
                            </Link>
                            <a
                                href={WA_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={close}
                                aria-label={t("contactWhatsapp")}
                                className={`${item} text-[#ebe7d8] hover:bg-white/5 hover:text-white`}
                            >
                                {t("contact")}
                            </a>
                            <div className="mt-auto mb-3 flex items-center justify-between px-4 py-3.5 border-t border-white/10">
                                <span className="text-base font-medium text-[#ebe7d8]">{t("language")}</span>
                                <div className="flex gap-1 rounded-xl border border-white/15 p-1" role="group" aria-label={t("language")}>
                                    {["en", "az"].map((code) => (
                                        <button
                                            key={code}
                                            type="button"
                                            onClick={() => {
                                                close();
                                                router.replace(pathname, { locale: code });
                                            }}
                                            aria-pressed={locale === code}
                                            className={`rounded-lg px-3 py-1 text-sm font-semibold uppercase transition-colors cursor-pointer ${
                                                locale === code ? "bg-[#ebe7d8] text-[#1c1a17]" : "text-[#ebe7d8] hover:bg-white/10"
                                            }`}
                                        >
                                            {code}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>
                </>,
                document.body
            )}
        </div>
    );
}
