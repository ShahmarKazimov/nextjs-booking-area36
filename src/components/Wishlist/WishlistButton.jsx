"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useWishlist } from "./WishlistProvider";

export default function WishlistButton({ slug, className = "" }) {
    const t = useTranslations("Wishlist");
    const { has, toggle } = useWishlist();
    const saved = has(slug);

    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(slug);
            }}
            aria-pressed={saved}
            aria-label={saved ? t("remove") : t("add")}
            title={saved ? t("remove") : t("add")}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#2d4a2b] shadow-sm border border-black/5 backdrop-blur transition-all hover:bg-white hover:scale-105 cursor-pointer ${className}`}
        >
            <Heart
                size={18}
                aria-hidden="true"
                className={saved ? "fill-[#2d4a2b] text-[#2d4a2b]" : ""}
            />
        </button>
    );
}
