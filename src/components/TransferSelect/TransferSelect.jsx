'use client';

import { useState } from 'react';
import { Car } from 'lucide-react';
import Link from 'next/link';

export default function TransferSelect({ homeTitle }) {
    const [selectedCar, setSelectedCar] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const carOptions = [
        'Mercedes Vito 7-8 seat',
        'Mercedes Sprinter 13-18 seats',
        'Sedan 4 seats'
    ];

    return (
        <>
            <div className="flex justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-1 text-gray-600">
                    <Car size={18} />
                    <span className="text-gray-600">Transfer</span>
                </div>
            </div>
            <div className="relative mt-2 mb-4">
                {/* Selected Value Display */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3.5 border border-gray-200 rounded-xl text-gray-900 bg-white hover:border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none cursor-pointer transition-all duration-200 flex items-center justify-between group"
                >
                    <span className={`font-medium ${!selectedCar ? 'text-gray-400' : ''}`}>
                        {selectedCar || 'Select transfer (Optional)'}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Options */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="max-h-60 overflow-y-auto">
                            {carOptions.map((car, index) => (
                                <button
                                    key={car}
                                    onClick={() => {
                                        setSelectedCar(car);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full p-3.5 text-left hover:bg-gray-50 transition-colors duration-150 ${selectedCar === car ? 'bg-gray-100 font-medium' : ''
                                        } ${index !== carOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
                                >
                                    <span className={selectedCar === car ? 'text-black' : 'text-gray-700'}>
                                        {car}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Link
                href={`https://wa.me/994552904045?text=Hello, I would like to get more information about ${encodeURIComponent(homeTitle)}${selectedCar ? ` with ${encodeURIComponent(selectedCar)}` : ' without transfer'}.`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <button className="cursor-pointer w-full rounded-lg bg-gray-900 hover:bg-gray-700 py-3.5 px-7 text-sm font-bold uppercase text-white shadow-md hover:shadow-lg transition-all">
                    Reserve Now
                </button>
            </Link>
        </>
    );
}
