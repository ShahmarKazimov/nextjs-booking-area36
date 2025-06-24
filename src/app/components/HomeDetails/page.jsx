'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ images, title }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="md:col-span-2 md:row-span-2">
                    <img
                        src={images[0]}
                        alt={`${title} main image`}
                        className="w-full h-full md:h-[29rem] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-lg"
                        onClick={() => openModal(0)}
                    />
                </div>

                {images.slice(1, 5).map((img, i) => (
                    <div key={i + 1} className="relative">
                        <img
                            src={img}
                            alt={`${title} image ${i + 2}`}
                            className="w-full h-full md:h-56 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity shadow-md"
                            onClick={() => openModal(i + 1)}
                        />
                        {i === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-colors"
                                onClick={() => openModal(i + 1)}>
                                <span className="text-white text-xl font-semibold">
                                    +{images.length - 5}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="absolute left-4 text-white hover:text-gray-300 z-10 p-2"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="max-w-4xl max-h-full flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt={`${title} large image`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="absolute right-4 text-white hover:text-gray-300 z-10 p-2"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>

                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-xs overflow-x-auto">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`small image ${i + 1}`}
                                className={`w-12 h-12 object-cover rounded cursor-pointer ${i === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(i);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}