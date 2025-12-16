'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeDetails({ images = [], title = '', description = '' }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const thumbnailRefs = useState([])[0];

    useEffect(() => {
        if (images.length === 0) return;

        let loadedCount = 0;
        const totalImages = Math.min(images.length, 5);

        images.slice(0, 5).forEach((src) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setIsLoading(false);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setIsLoading(false);
                }
            };
        });
    }, [images]);

    useEffect(() => {
        if (!selectedImage) return;

        const handleKeyPress = (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') navigate('next');
            if (e.key === 'ArrowLeft') navigate('prev');
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedImage, currentIndex]);

    const openModal = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
    };

    const closeModal = () => setSelectedImage(null);

    const navigate = (direction) => {
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % images.length
            : (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);

        if (thumbnailRefs[newIndex]) {
            thumbnailRefs[newIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            navigate('next');
        } else if (distance < -minSwipeDistance) {
            navigate('prev');
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    if (!images || images.length === 0) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[29rem] mb-8">
                <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="mt-4 text-center">
                        <p className="text-lg font-medium text-gray-600">Loading images...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Grid Layout */}
            <section
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                aria-label={`${title} photo gallery`}
            >
                <div className="md:col-span-2 md:row-span-2 relative h-64 sm:h-80 md:h-[29rem]">
                    <Image
                        src={images[0]}
                        alt={`${title} - main photo${description ? `, ${description}` : ''}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover rounded-xl cursor-pointer hover:opacity-90 duration-200 transition-opacity shadow-lg"
                        onClick={() => openModal(0)}
                    />
                </div>

                {images.slice(1, 5).map((img, i) => (
                    <div key={i + 1} className="relative h-48 sm:h-56 md:h-56">
                        <Image
                            src={img}
                            alt={`${title} - interior photo ${i + 2}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                            className="object-cover rounded-xl cursor-pointer hover:opacity-90 duration-200 transition-opacity shadow-md"
                            onClick={() => openModal(i + 1)}
                        />
                        {i === 3 && images.length > 5 && (
                            <div
                                className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
                                onClick={() => openModal(i + 1)}
                                role="button"
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

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    <button
                        onClick={closeModal}
                        className="absolute cursor-pointer top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
                        aria-label="Close image viewer"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                        className="absolute cursor-pointer left-4 text-white hover:text-gray-300 z-10 p-2"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div
                        className="max-w-4xl max-h-full flex items-center justify-center relative w-full h-full"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                            <Image
                                src={selectedImage}
                                alt={`${title} - full view, image ${currentIndex + 1} / ${images.length}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 90vw"
                                className="object-contain rounded-lg select-none"
                                onClick={(e) => e.stopPropagation()}
                                quality={95}
                            />
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                        className="absolute cursor-pointer right-4 text-white hover:text-gray-300 z-10 p-2"
                        aria-label="Next image"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <nav
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-[90vw] sm:max-w-md overflow-x-auto py-2 px-2"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                        }}
                        aria-label="Image thumbnails"
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                ref={(el) => (thumbnailRefs[i] = el)}
                                className="relative w-12 h-12 flex-shrink-0"
                            >
                                <Image
                                    src={img}
                                    alt={`${title} thumbnail ${i + 1}`}
                                    fill
                                    sizes="48px"
                                    className={`object-cover rounded cursor-pointer transition-all ${i === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-80'
                                        }`}
                                    onClick={(e) => { e.stopPropagation(); openModal(i); }}
                                />
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}