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
            aria-labelledby="featured-properties-title"
            className="px-4 lg:px-0 min-h-screen pb-16 pt-4"
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
                    <p className="text-gray-600 text-base max-w-2xl mx-auto mt-3">
                        {t('description')}
                    </p>

                    {/* Filter Tabs */}
                    <div className="w-full max-w-xl mx-auto mt-6 sm:mt-8 px-1 sm:px-0">
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveFilter('all')}
                                className={`w-full py-3 sm:px-5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between px-5 gap-1.5 shadow-sm ${
                                    activeFilter === 'all'
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span>
                                    {isAz ? 'Bütün' : 'All'}
                                    <span className="hidden sm:inline"> {isAz ? 'Evlər' : 'Homes'}</span>
                                </span>
                                <span
                                    className={`text-[10px] min-w-[18px] h-[18px] px-1 rounded-full inline-flex items-center justify-center font-bold leading-none ${
                                        activeFilter === 'all'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {homes.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveFilter('our')}
                                className={`w-full py-3 px-5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between gap-1.5 shadow-sm ${
                                    activeFilter === 'our'
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span>
                                    {isAz ? 'Bizim' : 'Our'}
                                    <span className="hidden sm:inline"> {isAz ? 'Evlər' : 'Homes'}</span>
                                </span>
                                <span
                                    className={`text-[10px] min-w-[18px] h-[18px] px-1 rounded-full inline-flex items-center justify-center font-bold leading-none ${
                                        activeFilter === 'our'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {ourHomes.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveFilter('partner')}
                                className={`w-full py-3 px-5 sm:px-5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between gap-1.5 shadow-sm ${
                                    activeFilter === 'partner'
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span>
                                    {isAz ? 'Partnyor' : 'Partner'}
                                    <span className="hidden sm:inline"> {isAz ? 'Evlər' : 'Homes'}</span>
                                </span>
                                <span
                                    className={`text-[10px] min-w-[18px] h-[18px] px-1 rounded-full inline-flex items-center justify-center font-bold leading-none ${
                                        activeFilter === 'partner'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {partnerHomes.length}
                                </span>
                            </button>
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
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                                        {t('ourHomesSubtitle')}
                                    </p>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
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
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                                        {t('partnerHomesSubtitle')}
                                    </p>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
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
