"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HeaderNav() {
    const t = useTranslations("Header");
    const pathname = usePathname();

    const base =
        "relative py-2 text-[15px] font-medium text-[#ebe7d8] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#d8c58f] after:transition-all after:duration-300";
    const cls = (active) =>
        `${base} ${active ? "text-white after:w-full" : "after:w-0 hover:after:w-full"}`;

    return (
        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
            <Link href="/" className={cls(pathname === "/")} aria-current={pathname === "/" ? "page" : undefined}>
                {t("home")}
            </Link>
            <Link href="/#villas" className={cls(false)}>
                {t("villas")}
            </Link>
            <Link
                href="/tours-transfers"
                className={cls(pathname === "/tours-transfers")}
                aria-current={pathname === "/tours-transfers" ? "page" : undefined}
            >
                {t("transfers")}
            </Link>
            <Link
                href="/about"
                className={cls(pathname === "/about")}
                aria-current={pathname === "/about" ? "page" : undefined}
            >
                {t("about")}
            </Link>
        </nav>
    );
}
