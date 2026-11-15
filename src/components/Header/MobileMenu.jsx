"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
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
        const onPointer = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onPointer);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onPointer);
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

            {open && (
                <>
                    <nav
                        id="mobile-menu"
                        aria-label="Mobile"
                        className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-[#1c1a17]/95 backdrop-blur-md shadow-lg"
                    >
                        <div className="max-w-7xl mx-auto">
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
                            <div className="flex items-center justify-between px-4 py-3.5">
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
                </>
            )}
        </div>
    );
}
