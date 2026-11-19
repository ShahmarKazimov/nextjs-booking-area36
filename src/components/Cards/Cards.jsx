'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SingleCard from './SingleCard/SingleCard';
import homes from '../data/homes';
import { useTranslations, useLocale } from 'next-intl';

export default function Cards() {
    const t = useTranslations('Cards');
    const locale = useLocale();
    const isAz = locale === 'az';

    // Date search from the hero (?arrival&departure&adults&children): per-home availability from Beds24
    const sp = useSearchParams();
    const arrival = sp.get('arrival') || '';
    const departure = sp.get('departure') || '';
    const adults = sp.get('adults') || '2';
    const children = sp.get('children') || '0';
    const searchActive = /^\d{4}-\d{2}-\d{2}$/.test(arrival) && /^\d{4}-\d{2}-\d{2}$/.test(departure);
    const searchQuery = searchActive
        ? new URLSearchParams({ arrival, departure, adults, children }).toString()
        : '';
    const MONTHS = isAz
        ? ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const niceDay = (str) => {
        const [, m, d] = str.split('-').map(Number);
        return `${d} ${MONTHS[m - 1]}`;
    };
    const [results, setResults] = useState({});
    const [searchState, setSearchState] = useState('idle'); // idle | loading | done | error

    useEffect(() => {
        if (!searchActive) {
            setResults({});
            setSearchState('idle');
            return;
        }
        let cancelled = false;
        setSearchState('loading');
        fetch(`/api/search?${searchQuery}`)
            .then((r) => r.json())
            .then((data) => {
                if (cancelled) return;
                if (data.success) {
                    setResults(data.results || {});
                    setSearchState('done');
                } else {
                    setResults({});
                    setSearchState('error');
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setResults({});
                    setSearchState('error');
                }
            });
        return () => {
            cancelled = true;
        };
    }, [searchActive, searchQuery]);

    // One list, no our/partner split: our homes first, then partners (same order as before)
    const allHomes = [...homes.filter((h) => !h.isPartner), ...homes.filter((h) => h.isPartner)];

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
                </header>

                {searchActive && (
                    <p
                        role="status"
                        className="mb-8 -mt-2 text-center text-sm text-gray-600"
                    >
                        {searchState === 'loading'
                            ? isAz ? 'Mövcudluq yoxlanılır…' : 'Checking availability…'
                            : searchState === 'error'
                                ? isAz ? 'Mövcudluğu yoxlamaq mümkün olmadı, bir azdan yenidən cəhd edin.' : 'Could not check availability right now. Please try again shortly.'
                                : isAz
                                    ? `${niceDay(arrival)} – ${niceDay(departure)} tarixləri üçün mövcudluq göstərilir`
                                    : `Showing availability for ${niceDay(arrival)} – ${niceDay(departure)}`}
                    </p>
                )}

                <ul
                    role="list"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {allHomes.map((property) => (
                        <li key={property.id}>
                            <SingleCard property={property} search={results[property.slug] || null} searchQuery={searchQuery} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
