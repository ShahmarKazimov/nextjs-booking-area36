import SingleCard from "./SingleCard/SingleCard";
import homes from "../data/homes";
import { useTranslations } from "next-intl";

export default function Cards() {
    const t = useTranslations('Cards');

    return (
        <section
            aria-labelledby="featured-properties-title"
            className="px-4 lg:px-0 flex justify-end items-start min-h-screen py-10"
        >
            <div className="max-w-7xl mx-auto w-full">
                <header className="text-center mb-6">
                    {/* h1 → h2: səhifədə HeroSection-da artıq h1 var */}
                    <h2
                        id="featured-properties-title"
                        className="text-2xl md:text-3xl font-bold text-black relative"
                    >
                        {t('title')}
                    </h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4">
                        {t('description')}
                    </p>
                </header>

                {/* main silindi — layout.js-də artıq var */}
                <ul
                    role="list"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {homes.map((property) => (
                        <li key={property.id}>
                            <SingleCard property={property} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}