'use client';

import { useState } from 'react';
import SingleCard from './SingleCard/SingleCard';
import homes from '../data/homes';
import { useTranslations, useLocale } from 'next-intl';

export default function Cards() {
    const t = useTranslations('Cards');
    const locale = useLocale();
    const isAz = locale === 'az';
    const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'our' | 'partner'

    const ourHomes = homes.filter((h) => !h.isPartner);
    const partnerHomes = homes.filter((h) => h.isPartner);

    return (
        <section
            id="villas"
            aria-labelledby="featured-properties-title"
            className="px-4 lg:px-0 min-h-screen pb-16 pt-14 sm:pt-4 scroll-mt-24"
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* Main Header */}
                <header className="text-center mb-8">
                    <h2
                        id="featured-properties-title"
                        className="text-2xl md:text-5xl font-bold text-black relative"
                    >
                        {t('title')}
                    </h2>
                    {/* Filter Tabs */}
                    <div className="w-full max-w-xl mx-auto mt-6 sm:mt-8 px-1 sm:px-0">
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { key: 'all', label: isAz ? 'Hamısı' : 'All' },
                                { key: 'our', label: isAz ? 'Bizim' : 'Our' },
                                { key: 'partner', label: isAz ? 'Partnyor' : 'Partner' },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveFilter(key)}
                                    className={`w-full py-3 px-4 rounded-xl border text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer text-center ${
                                        activeFilter === key
                                            ? 'bg-[#2d4a2b] border-[#2d4a2b] text-white'
                                            : 'bg-[#edeae4] border-[#e0dcd4] text-black hover:bg-[#e6e2da]'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Content Sections */}
                <div className="space-y-16">
                    {/* SECTION 1: BİZİM EVLƏRİMİZ */}
                    {(activeFilter === 'all' || activeFilter === 'our') && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                        {t('ourHomesTitle')}
                                    </h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 whitespace-nowrap flex-shrink-0 ml-3">
                                    {ourHomes.length} villa
                                </span>
                            </div>

                            <ul
                                role="list"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {ourHomes.map((property) => (
                                    <li key={property.id}>
                                        <SingleCard property={property} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* SECTION 2: PARTNYOR EVLƏR */}
                    {(activeFilter === 'all' || activeFilter === 'partner') && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                        {t('partnerHomesTitle')}
                                    </h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 whitespace-nowrap flex-shrink-0 ml-3">
                                    {partnerHomes.length} villa
                                </span>
                            </div>

                            <ul
                                role="list"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {partnerHomes.map((property) => (
                                    <li key={property.id}>
                                        <SingleCard property={property} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
