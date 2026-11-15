"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import homes from "../data/homes";
import SingleCard from "../Cards/SingleCard/SingleCard";
import { useWishlist } from "./WishlistProvider";

export default function WishlistContent() {
    const t = useTranslations("Wishlist");
    const { slugs, ready } = useWishlist();

    // Keep the order the user saved them in; ignore slugs that no longer exist
    const saved = slugs.map((s) => homes.find((h) => h.slug === s)).filter(Boolean);

    return (
        <section className="px-4 lg:px-0 min-h-screen pb-16 pt-4">
            <div className="max-w-7xl mx-auto w-full">
                <header className="text-center mb-8">
                    <h1 className="text-2xl md:text-5xl font-bold text-black">{t("title")}</h1>
                    <p className="mt-3 text-sm md:text-base text-gray-600">{t("subtitle")}</p>
                </header>

                {!ready ? null : saved.length === 0 ? (
                    <div className="mx-auto max-w-md rounded-2xl border border-[#e0dcd4] bg-[#edeae4] p-8 text-center text-gray-800">
                        <Heart className="mx-auto mb-4 h-10 w-10 text-[#2d4a2b]" aria-hidden="true" />
                        <h2 className="text-lg font-bold text-gray-900">{t("emptyTitle")}</h2>
                        <p className="mt-2 text-sm text-gray-600">{t("emptyText")}</p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] py-2.5 px-5 text-sm font-semibold transition-all"
                        >
                            {t("browse")}
                        </Link>
                    </div>
                ) : (
                    <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {saved.map((property) => (
                            <li key={property.id}>
                                <SingleCard property={property} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
