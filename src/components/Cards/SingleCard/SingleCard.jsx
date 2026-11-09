'use client';

import Image from "next/image";
import Icons from "../../ui/icons/icons";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";

const SingleCard = ({ property }) => {
    const tHome = useTranslations(`Homes.${property.slug}`);
    const tCards = useTranslations("Cards");
    const tDetails = useTranslations("Details");
    const locale = useLocale();
    const isAz = locale === "az";

    const title = tHome("title");
    const type = tHome("type");
    const description = tHome("description");
    const location = tHome("location");

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
                            className="inline-flex items-center justify-center rounded-xl bg-black py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-neutral-800 transition-all text-center cursor-pointer"
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
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:shadow-md transition-all text-center cursor-pointer"
                            title="WhatsApp ilə qiyməti öyrən"
                        >
                            <MessageCircle size={14} />
                            <span>{tCards("inquirePrice")}</span>
                        </a>
                    </>
                )}
            </div>
        </article>
    );
};

export default SingleCard;
