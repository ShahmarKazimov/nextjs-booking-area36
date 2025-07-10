'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeDetails({ images = [], title = '', description = '' }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

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
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') navigate('next');
        if (e.key === 'ArrowLeft') navigate('prev');
    };

    // Eğer images boşsa hiçbir şey render etme
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            {/* Grid Layout */}
            <section 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                aria-label={`${title} photo gallery`}
            >
                <div className="md:col-span-2 md:row-span-2">
                    <img
                        src={images[0]}
                        alt={`${title} - main photo${description ? `, ${description}` : ''}`}
                        className="w-full h-full md:h-[29rem] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-lg"
                        onClick={() => openModal(0)}
                        loading="eager"
                        width="600"
                        height="464"
                    />
                </div>

                {images.slice(1, 5).map((img, i) => (
                    <div key={i + 1} className="relative">
                        <img
                            src={img}
                            alt={`${title} - interior photo ${i + 2}`}
                            className="w-full h-full md:h-56 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-md"
                            onClick={() => openModal(i + 1)}
                            loading="lazy"
                            width="300"
                            height="224"
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
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    <button 
                        onClick={closeModal} 
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
                        aria-label="Close image viewer"
                    >
                        <X size={32} />
                    </button>

                    <button 
                        onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                        className="absolute left-4 text-white hover:text-gray-300 z-10 p-2"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="max-w-4xl max-h-full flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt={`${title} - full view, image ${currentIndex + 1} / ${images.length}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                        className="absolute right-4 text-white hover:text-gray-300 z-10 p-2"
                        aria-label="Next image"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>

                    <nav 
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 max-w-xs overflow-x-auto"
                        aria-label="Image thumbnails"
                    >
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`${title} thumbnail ${i + 1}`}
                                className={`w-12 h-12 object-cover rounded cursor-pointer ${
                                    i === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                                }`}
                                onClick={(e) => { e.stopPropagation(); openModal(i); }}
                                loading="lazy"
                            />
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
