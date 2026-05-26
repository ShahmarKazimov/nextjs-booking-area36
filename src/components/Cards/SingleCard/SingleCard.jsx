import Image from "next/image";
import Icons from "../../ui/icons/icons";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const SingleCard = ({ property }) => {
    const tHome = useTranslations(`Homes.${property.slug}`);
    const tCards = useTranslations("Cards");

    const title = tHome("title");
    const type = tHome("type");
    const description = tHome("description");
    const location = tHome("location");

    return (
        <article className="border border-black/10 relative flex flex-col w-full h-full rounded-xl bg-white text-gray-700 shadow-xl">
            {/* Şəkil */}
            <div className="relative mx-4 mt-4 overflow-hidden shadow-lg rounded-xl h-56 flex-shrink-0">
                <Image
                    src={property.images[0]}
                    alt={`${title} — luxury ${type || "chalet"} in ${location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-transparent to-black/60" aria-hidden="true" />
            </div>

            {/* Məzmun */}
            <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-medium text-blue-gray-900 line-clamp-2">
                        {title}
                    </h3>
                    <p
                        className="flex items-center gap-1.5 text-base text-blue-gray-900 flex-shrink-0"
                        aria-label={`Rating: ${property.rating} out of 10`}
                    >
                        {Icons.star}
                        {property.rating}
                    </p>
                </div>
                <p className="text-base text-gray-700 line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Link düyməsi */}
            <div className="px-6 pb-6 flex-shrink-0">
                {/* button içində Link yox, Link içində button da yanlışdır —
                    birbaşa Link-i styled button kimi göstər */}
                <Link
                    href={`/${property.slug}`}
                    className="block w-full rounded-lg bg-gray-900 py-3.5 px-7 text-sm font-bold uppercase text-white shadow-md hover:shadow-lg hover:bg-gray-700 transition-all text-center"
                    aria-label={`View details for ${title}`}
                >
                    {tCards("viewDetails")}
                </Link>
            </div>
        </article>
    );
};

export default SingleCard;