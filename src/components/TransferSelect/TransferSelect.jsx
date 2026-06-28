'use client';

import { useState, useRef, useEffect } from 'react';
import { Car } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function TransferSelect({ homeTitle }) {
    const [selectedCar, setSelectedCar] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    const tDetails = useTranslations('Details');
    const tTransfers = useTranslations('Transfers');
    const locale = useLocale();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const carOptions = ['vito', 'sprinter', 'sedan'];
    const selectedCarLabel = selectedCar ? tTransfers(selectedCar) : '';

    const waText = locale === 'az'
        ? `Salam, ${homeTitle} haqqında ətraflı məlumat almaq istəyirəm.${selectedCar ? ` Transfer: ${selectedCarLabel}.` : ' Transfersiz.'}`
        : `Hello, I would like to get more information about ${homeTitle}.${selectedCar ? ` Transfer: ${selectedCarLabel}.` : ' Without transfer.'}`;

    async function handleDeposit() {
        setLoading(true);
        try {
            const orderId = `deposit_${Date.now()}`;
            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, homeTitle }),
            });

            const data = await res.json();

            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
            }
        } catch {
            alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Transfer seçimi */}
            <div className="flex justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-1 text-gray-600">
                    <Car size={18} />
                    <span className="text-gray-600">{tDetails('transfer')}</span>
                </div>
            </div>

            <div className="relative mt-2 mb-4" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3.5 border border-gray-200 rounded-xl text-gray-900 bg-white hover:border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none cursor-pointer transition-all duration-200 flex items-center justify-between group"
                >
                    <span className={`font-medium ${!selectedCar ? 'text-gray-400' : ''}`}>
                        {selectedCar ? tTransfers(selectedCar) : tDetails('selectTransfer')}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        <div className="max-h-60 overflow-y-auto">
                            {carOptions.map((carKey, index) => (
                                <button
                                    key={carKey}
                                    onClick={() => { setSelectedCar(carKey); setIsOpen(false); }}
                                    className={`cursor-pointer w-full p-3.5 text-left hover:bg-gray-50 transition-colors duration-150 ${selectedCar === carKey ? 'bg-gray-100 font-medium' : ''} ${index !== carOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
                                >
                                    <span className={selectedCar === carKey ? 'text-black' : 'text-gray-700'}>
                                        {tTransfers(carKey)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* WhatsApp düyməsi */}
            <a
                href={`https://wa.me/994552904045?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mb-3 cursor-pointer rounded-lg bg-gray-900 duration-200 hover:bg-gray-600 py-3.5 px-7 text-sm font-bold uppercase text-white shadow-md hover:shadow-lg transition-all text-center"
            >
                {tDetails('reserveNow')}
            </a>

            {/* Beh ödəniş düyməsi */}
            <button
                onClick={handleDeposit}
                disabled={loading}
                className="cursor-pointer hover:bg-gray-200 duration-200 w-full rounded-lg border-2 border-gray-900 hover:bg-gray-100 py-3 px-7 text-sm font-bold uppercase text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                    {loading ? tDetails('loading') : tDetails('payPrePayment')}
            </button>
        </>
    );
}