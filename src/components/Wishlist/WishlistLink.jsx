"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useWishlist } from "./WishlistProvider";

export default function WishlistLink({ className = "" }) {
    const t = useTranslations("Wishlist");
    const { slugs } = useWishlist();
    const count = slugs.length;

    return (
        <Link
            href="/wishlist"
            aria-label={`${t("title")}${count ? ` (${count})` : ""}`}
            title={t("title")}
            className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-[0.5rem] text-sm font-semibold border border-white/15 text-[#ebe7d8] hover:bg-white/10 hover:text-white transition-all ${className}`}
        >
            <Heart size={16} aria-hidden="true" className={count ? "fill-current" : ""} />
            <span className="hidden sm:inline">{t("title")}</span>
            {count > 0 && (
                <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-[#ebe7d8] px-1.5 text-[11px] font-bold text-[#1c1a17]">
                    {count}
                </span>
            )}
        </Link>
    );
}
