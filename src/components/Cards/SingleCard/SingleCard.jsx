'use client';

import { useState } from "react";
import Image from "next/image";
import Icons from "../../ui/icons/icons";
import { Link } from "@/i18n/routing";
import WishlistButton from "../../Wishlist/WishlistButton";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, BedDouble, Bath, Users, Loader2 } from "lucide-react";

const SingleCard = ({ property }) => {
    const tHome = useTranslations(`Homes.${property.slug}`);
    const tCards = useTranslations("Cards");
    const tDetails = useTranslations("Details");
    const locale = useLocale();
    const isAz = locale === "az";
    const [navigating, setNavigating] = useState(false);

    // Show a spinner right away on a normal click (ignore new-tab / modified clicks)
    const handleNavigate = (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        setNavigating(true);
    };

    const title = tHome("title");
    const type = tHome("type");
    const description = tHome("description");
    const location = tHome("location");

    // Bedrooms / bathrooms are derived from the English feature keys (e.g. "4 Bedrooms")
    const countFeature = (pattern) => {
        const match = property.features
            ?.map((f) => f.match(pattern))
            .find(Boolean);
        return match ? Number(match[1]) : null;
    };
    const bedrooms = countFeature(/^(\d+)\s+bedrooms?/i);
    const bathrooms = countFeature(/^(\d+)\s+bathrooms?/i);
    const guests = property.occupancy;
    const stats = [
        bedrooms && { Icon: BedDouble, label: tCards("bedrooms", { count: bedrooms }) },
        bathrooms && { Icon: Bath, label: tCards("bathrooms", { count: bathrooms }) },
        guests && { Icon: Users, label: tCards("guests", { count: guests }) },
    ].filter(Boolean);

    // Translation-based alt text
    const inWord = tDetails("in");
    const imageAlt = inWord
        ? `${title} — ${tDetails("luxury")} ${type || "chalet"} ${inWord} ${location}`
        : `${title} — ${tDetails("luxury")} ${type || "chalet"} ${location}`;

    // WhatsApp Inquiry URL for Partner Homes
    const waInquiryUrl = `https://wa.me/994552904045?text=${encodeURIComponent(
        isAz
            ? `Salam, Area36 vasitəsilə "${title}" üçün qiymət öyrənmək istəyirəm.`
            : `Hello, I would like to inquire about the price for "${title}" via Area36.`
    )}`;

    return (
        <article className="group border border-black/10 hover:border-black/25 relative flex flex-col w-full h-full rounded-2xl bg-white text-gray-700 shadow-md transition-all duration-300 hover:shadow-2xl overflow-hidden">
            {/* Top Clickable Area (Image + Details) */}
            <Link
                href={`/${property.slug}`}
                onClick={handleNavigate}
                className="flex flex-col flex-grow text-inherit no-underline cursor-pointer"
                aria-label={`${title} - ${tCards("viewDetails")}`}
            >
                {/* Photo */}
                <div className="relative mx-4 mt-4 overflow-hidden shadow-sm rounded-xl h-56 flex-shrink-0">
                    <Image
                        src={property.images[0]}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">
                                {title}
                            </h3>
                            <p
                                className="flex items-center gap-1 text-sm font-semibold text-gray-900 flex-shrink-0"
                                aria-label={`${tDetails("rating") || "Rating"}: ${property.rating} / 10`}
                            >
                                {Icons.star}
                                <span>{property.rating}</span>
                            </p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                        {stats.length > 0 && (
                            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-gray-700">
                                {stats.map(({ Icon, label }) => (
                                    <li key={label} className="flex items-center gap-1.5">
                                        <Icon size={14} className="text-[#2d4a2b]" aria-hidden="true" />
                                        <span>{label}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </Link>

            {/* Pricing / Action Bottom Bar (Outside the top Link to prevent nested <a> tags) */}
            <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3 flex-shrink-0">
                {!property.isPartner ? (
                    <>
                        <div>
                            <span className="text-[11px] text-gray-400 block font-medium uppercase tracking-wider">
                                {isAz ? "Qiymət" : "Price"}
                            </span>
                            <div className="flex items-baseline gap-1 text-gray-900">
                                <span className="text-xl font-bold tracking-tight">₼ {property.price}</span>
                                <span className="text-xs text-gray-500 font-normal">/ {tCards("perNight")}</span>
                            </div>
                        </div>
                        <Link
                            href={`/${property.slug}`}
                            onClick={handleNavigate}
                            className="inline-flex items-center justify-center rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] py-2.5 px-4 text-sm font-semibold transition-all text-center cursor-pointer"
                        >
                            {tCards("viewDetails")}
                        </Link>
                    </>
                ) : (
                    <>
                        <div>
                            <span className="text-[11px] text-gray-400 block font-medium uppercase tracking-wider">
                                {tCards("partnerBadge")}
                            </span>
                            <span className="text-xs text-gray-700 font-semibold">
                                {tCards("priceOnRequest")}
                            </span>
                        </div>
                        <a
                            href={waInquiryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] py-2.5 px-4 text-sm font-semibold transition-all text-center cursor-pointer"
                            title="WhatsApp ilə qiyməti öyrən"
                        >
                            <MessageCircle size={14} />
                            <span>{tCards("inquirePrice")}</span>
                        </a>
                    </>
                )}
            </div>
            <WishlistButton slug={property.slug} className="absolute top-7 right-7 z-[5]" />
            {navigating && (
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[2px]"
                    role="status"
                    aria-live="polite"
                >
                    <Loader2 className="h-8 w-8 animate-spin text-[#2d4a2b]" aria-hidden="true" />
                    <span className="sr-only">{tDetails("loading")}</span>
                </div>
            )}
        </article>
    );
};

export default SingleCard;
