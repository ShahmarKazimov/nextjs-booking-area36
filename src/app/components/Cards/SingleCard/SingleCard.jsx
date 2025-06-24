import React from "react";
import Icons from "../../ui/icons/icons";
import Link from "next/link";

const SingleCard = ({ property }) => {
    return (
        <article className="border border-black/10 relative flex justify-between w-full flex-col rounded-xl bg-white text-gray-700 shadow-xl">
            <header>
                <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                </div>
            </header>

            <section className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-medium text-blue-gray-900">
                        {property.title}
                    </h2>
                    <p className="flex items-center gap-1.5 text-base text-blue-gray-900">
                        {Icons.star}
                        {property.rating}
                    </p>
                </div>
                <p className="text-base text-gray-700">{property.description}</p>
            </section>

            <footer className="px-6 pb-6 flex flex-col gap-y-4">
                <Link href={`/${property.slug}`}>
                    <button className="cursor-pointer w-full rounded-lg bg-gray-900 py-3.5 px-7 text-sm font-bold uppercase text-white shadow-md hover:shadow-lg transition-all">
                        Reserve
                    </button>
                </Link>
            </footer>
        </article>
    );
};

export default SingleCard;
