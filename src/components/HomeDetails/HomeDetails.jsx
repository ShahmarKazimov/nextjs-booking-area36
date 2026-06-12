'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeDetails({ images = [], title = '', description = '' }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const thumbnailRefs = useRef([]);

    const isOpen = selectedIndex !== null;

    // Keyboard navigation
    const navigate = useCallback((direction) => {
        setSelectedIndex((prev) => {
            if (prev === null) return null;
            const next =
                direction === 'next'
                    ? (prev + 1) % images.length
                    : (prev - 1 + images.length) % images.length;

            // Thumbnail-i görünən sahəyə gətir
            thumbnailRefs.current[next]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });

            return next;
        });
    }, [images.length]);

    const closeModal = useCallback(() => setSelectedIndex(null), []);

    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') navigate('next');
            if (e.key === 'ArrowLeft') navigate('prev');
        };

        window.addEventListener('keydown', handleKey);
        // Modal açıqkən scroll-u bağla
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, navigate, closeModal]);

    // Touch / swipe handlers
    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.touches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (Math.abs(distance) >= 50) {
            navigate(distance > 0 ? 'next' : 'prev');
        }
        setTouchStart(0);
        setTouchEnd(0);
    };

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* ── Photo Grid ─────────────────────────────────────────── */}
            <section
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                aria-label={`${title} photo gallery`}
            >
                {/* Ana şəkil — LCP üçün priority */}
                <div className="md:col-span-2 md:row-span-2 relative h-64 sm:h-80 md:h-[29rem]">
                    <Image
                        src={images[0]}
                        alt={`${title} - main photo${description ? `, ${description}` : ''}`}
                        fill
                        priority                        // ← LCP xəbərdarlığını aradan qaldırır
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover rounded-xl cursor-pointer hover:opacity-90 duration-200 transition-opacity shadow-lg"
                        onClick={() => setSelectedIndex(0)}
                    />
                </div>

                {/* Kiçik şəkillər (2–5) */}
                {images.slice(1, 5).map((img, i) => (
                    <div key={i + 1} className="relative h-48 sm:h-56 md:h-56">
                        <Image
                            src={img}
                            alt={`${title} - photo ${i + 2}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                            className="object-cover rounded-xl cursor-pointer hover:opacity-90 duration-200 transition-opacity shadow-md"
                            onClick={() => setSelectedIndex(i + 1)}
                        />

                        {/* "Daha çox" overlay — 5-ci şəkildə */}
                        {i === 3 && images.length > 5 && (
                            <div
                                className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
                                onClick={() => setSelectedIndex(i + 1)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(i + 1)}
                                aria-label={`Show ${images.length - 5} more photos`}
                            >
                                <span className="text-white text-xl font-semibold">
                                    +{images.length - 5}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* ── Lightbox Modal ─────────────────────────────────────── */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    {/* Bağla */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 cursor-pointer"
                        aria-label="Close image viewer"
                    >
                        <X size={32} />
                    </button>

                    {/* Əvvəlki */}
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                        className="absolute left-4 text-white hover:text-gray-300 z-10 p-2 cursor-pointer"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    {/* Şəkil sahəsi */}
                    <div
                        className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={`${title} - photo ${selectedIndex + 1} of ${images.length}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 90vw"
                            className="object-contain rounded-lg select-none"
                            onClick={(e) => e.stopPropagation()}
                            quality={95}
                        />
                    </div>

                    {/* Növbəti */}
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                        className="absolute right-4 text-white hover:text-gray-300 z-10 p-2 cursor-pointer"
                        aria-label="Next image"
                    >
                        <ChevronRight size={48} />
                    </button>

                    {/* Thumbnail sıra */}
                    <nav
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-[90vw] sm:max-w-md overflow-x-auto py-2 px-2"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}
                        aria-label="Image thumbnails"
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                ref={(el) => (thumbnailRefs.current[i] = el)}
                                className="relative w-12 h-12 flex-shrink-0"
                            >
                                <Image
                                    src={img}
                                    alt={`${title} thumbnail ${i + 1}`}
                                    fill
                                    sizes="48px"
                                    className={`object-cover rounded cursor-pointer transition-all ${
                                        i === selectedIndex
                                            ? 'ring-2 ring-white scale-110'
                                            : 'opacity-60 hover:opacity-80'
                                    }`}
                                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                                />
                            </div>
                        ))}
                    </nav>

                    {/* Sayğac */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm select-none">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}