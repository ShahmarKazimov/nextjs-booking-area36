'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Car,
  ChevronLeft,
  ChevronRight,
  MapPin,
  UserRound,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// Explicit static month dictionaries to prevent browser ICU locale bugs (e.g. "M11 2026")
const AZ_MONTHS = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'İyun',
  'İyul',
  'Avqust',
  'Sentyabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr',
];

const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Helpers for Date Formatting
function toDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseDateStr(str) {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplayDate(dateStr, locale) {
  if (!dateStr) return '';
  const d = parseDateStr(dateStr);
  if (!d) return '';
  const day = d.getDate();
  const monthIdx = d.getMonth();
  const year = d.getFullYear();
  const monthName = locale === 'az' ? AZ_MONTHS[monthIdx] : EN_MONTHS[monthIdx];
  return `${day} ${monthName} ${year}`;
}

export default function BookingSidebar({
  homeTitle,
  location,
  owner,
  slug,
  airbnbUrl,
}) {
  const tDetails = useTranslations('Details');
  const tTransfers = useTranslations('Transfers');
  const locale = useLocale();

  // Calendar State
  const [bookedDates, setBookedDates] = useState(new Set());
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);
  const [hasIcal, setHasIcal] = useState(false);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [selectingStep, setSelectingStep] = useState('checkIn'); // 'checkIn' | 'checkOut'
  const [errorMsg, setErrorMsg] = useState(null);

  // Month navigation (current year and month)
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Transfer State
  const [selectedCar, setSelectedCar] = useState('none');
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const transferDropdownRef = useRef(null);

  // Fetch Airbnb iCal availability from our API
  useEffect(() => {
    let isMounted = true;

    async function loadCalendar() {
      try {
        setIsLoadingCalendar(true);
        const res = await fetch(`/api/calendar?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();

        if (isMounted && data.success) {
          setBookedDates(new Set(data.bookedDates || []));
          setHasIcal(Boolean(data.hasIcal));
        }
      } catch (err) {
        console.error('Failed to load iCal calendar:', err);
      } finally {
        if (isMounted) setIsLoadingCalendar(false);
      }
    }

    if (slug) {
      loadCalendar();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Click outside listener for Transfer dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        transferDropdownRef.current &&
        !transferDropdownRef.current.contains(event.target)
      ) {
        setIsTransferOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const d1 = parseDateStr(checkIn);
    const d2 = parseDateStr(checkOut);
    if (!d1 || !d2) return 0;
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  // Calendar Month Navigation Limits
  const canGoPrev = useMemo(() => {
    const currentViewDate = new Date(viewYear, viewMonth, 1);
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentViewDate > minDate;
  }, [viewYear, viewMonth, today]);

  function handlePrevMonth() {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  // Days Grid for current view month
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Monday as first day (0: Mon, ..., 6: Sun)
    const startCol = (firstDay.getDay() + 6) % 7;

    const days = [];
    for (let i = 0; i < startCol; i++) {
      days.push({ empty: true, id: `empty-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(viewYear, viewMonth, day);
      dateObj.setHours(0, 0, 0, 0);
      const dateStr = toDateString(dateObj);

      const isPast = dateObj < today;
      const isBooked = bookedDates.has(dateStr);
      const isCheckIn = checkIn === dateStr;
      const isCheckOut = checkOut === dateStr;

      let isInRange = false;
      if (checkIn && checkOut) {
        isInRange = dateStr > checkIn && dateStr < checkOut;
      }

      days.push({
        empty: false,
        id: dateStr,
        dayNumber: day,
        dateStr,
        isPast,
        isBooked,
        isCheckIn,
        isCheckOut,
        isInRange,
        isAvailable: !isPast && !isBooked,
      });
    }

    return days;
  }, [viewYear, viewMonth, today, bookedDates, checkIn, checkOut]);

  // Handle Day Selection
  function handleDayClick(dayItem) {
    if (dayItem.empty || dayItem.isPast || dayItem.isBooked) return;
    setErrorMsg(null);

    const clickedStr = dayItem.dateStr;

    // Step 1: Picking Check-In
    if (!checkIn || (checkIn && checkOut) || selectingStep === 'checkIn') {
      setCheckIn(clickedStr);
      setCheckOut(null);
      setSelectingStep('checkOut');
      return;
    }

    // Step 2: Picking Check-Out
    if (selectingStep === 'checkOut') {
      if (clickedStr <= checkIn) {
        setCheckIn(clickedStr);
        setCheckOut(null);
        setSelectingStep('checkOut');
        return;
      }

      // Check if any date between checkIn and clickedStr is booked
      const start = parseDateStr(checkIn);
      const end = parseDateStr(clickedStr);
      let hasOverlap = false;

      const cursor = new Date(start);
      cursor.setDate(cursor.getDate() + 1);

      while (cursor < end) {
        if (bookedDates.has(toDateString(cursor))) {
          hasOverlap = true;
          break;
        }
        cursor.setDate(cursor.getDate() + 1);
      }

      if (hasOverlap) {
        setErrorMsg(
          locale === 'az'
            ? 'Seçilmiş aralıqda artıq dolu tarixlər var. Zəhmət olmasa başqa aralıq seçin.'
            : 'Selected range includes already booked dates. Please choose another range.'
        );
        return;
      }

      // Valid range selected!
      setCheckOut(clickedStr);
      setSelectingStep('checkIn');
      setErrorMsg(null);
    }
  }

  function handleClearDates(e) {
    e?.stopPropagation();
    setCheckIn(null);
    setCheckOut(null);
    setSelectingStep('checkIn');
    setErrorMsg(null);
  }

  // Month header label (e.g. "Noyabr 2026", "Dekabr 2026")
  const currentMonthLabel = useMemo(() => {
    const monthName = locale === 'az' ? AZ_MONTHS[viewMonth] : EN_MONTHS[viewMonth];
    return `${monthName} ${viewYear}`;
  }, [viewYear, viewMonth, locale]);

  // Weekday initials matching Airbnb (Monday to Sunday)
  const weekDays = locale === 'az'
    ? ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Transfer Dropdown options
  const carOptions = [
    { key: 'none', label: tTransfers('none') },
    { key: 'vito', label: tTransfers('vito') },
    { key: 'sprinter', label: tTransfers('sprinter') },
    { key: 'sedan', label: tTransfers('sedan') },
  ];

  const currentTransferLabel = useMemo(() => {
    const found = carOptions.find((opt) => opt.key === selectedCar);
    return found ? found.label : tTransfers('none');
  }, [selectedCar, carOptions, tTransfers]);

  // Structured WhatsApp Message Composer
  const waText = useMemo(() => {
    const isAz = locale === 'az';
    const checkInDisplay = checkIn ? formatDisplayDate(checkIn, locale) : null;
    const checkOutDisplay = checkOut ? formatDisplayDate(checkOut, locale) : null;
    const transferText = currentTransferLabel;

    if (isAz) {
      if (checkInDisplay && checkOutDisplay) {
        return `Salam, Area36.az saytından müraciət edirəm.

🏡 Villa: ${homeTitle}
📍 Məkan: ${location}
📅 Giriş tarixi: ${checkInDisplay}
📅 Çıxış tarixi: ${checkOutDisplay}
🌙 Müddət: ${nights} gecə
🚗 Transfer: ${transferText}

Zəhmət olmasa bu tarixlər üçün mövcudluğu və qiyməti təsdiq edərdiniz.`;
      }
      return `Salam, Area36.az saytından müraciət edirəm.

🏡 Villa: ${homeTitle}
📍 Məkan: ${location}
🚗 Transfer: ${transferText}

Zəhmət olmasa villa haqqında ətraflı məlumat və mövcud tarixlər barədə məlumat verərdiniz.`;
    } else {
      if (checkInDisplay && checkOutDisplay) {
        return `Hello, I am contacting you via Area36.az.

🏡 Villa: ${homeTitle}
📍 Location: ${location}
📅 Check-in date: ${checkInDisplay}
📅 Check-out date: ${checkOutDisplay}
🌙 Duration: ${nights} night(s)
🚗 Transfer: ${transferText}

Please confirm availability and price for these dates.`;
      }
      return `Hello, I am contacting you via Area36.az.

🏡 Villa: ${homeTitle}
📍 Location: ${location}
🚗 Transfer: ${transferText}

Please provide more information and current availability for this property.`;
    }
  }, [homeTitle, location, checkIn, checkOut, nights, currentTransferLabel, locale]);

  // Payment Handler
  async function handleDeposit() {
    setLoadingPayment(true);
    try {
      const orderId = `deposit_${Date.now()}`;
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          homeTitle,
          checkIn,
          checkOut,
          nights,
          selectedCar,
        }),
      });

      const data = await res.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert(
          locale === 'az'
            ? 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'
            : 'An error occurred. Please try again.'
        );
      }
    } catch {
      alert(
        locale === 'az'
          ? 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'
          : 'An error occurred. Please try again.'
      );
    } finally {
      setLoadingPayment(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm px-6 py-6 sticky top-8 border border-gray-100">
      {/* Header */}
      <div className="pb-3 mb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">
          {tDetails('reservationRequest')}
        </h2>
      </div>

      {/* Location & Owner info */}
      <div className="mb-5 space-y-3">
        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={16} aria-hidden="true" />
            <span>{tDetails('location')}</span>
          </div>
          <span className="font-semibold text-gray-900">{location}</span>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-50 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <UserRound size={16} aria-hidden="true" />
            <span>{tDetails('owner')}</span>
          </div>
          <span className="font-semibold text-gray-900">{owner}</span>
        </div>
      </div>

      {/* ── AIRBNB STYLE CALENDAR ───────────────────────────────────── */}
      <div className="mb-6">
        {/* Title & Subtitle like Airbnb */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {locale === 'az' ? 'Tarixləri seçin' : 'Select dates'}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {locale === 'az' ? 'Dəqiq rezervasiya üçün tarixlərinizi seçin' : 'Add your travel dates for exact availability'}
          </p>
        </div>

        {/* Selected Dates Summary Badge */}
        {checkIn && (
          <div className="mb-3 p-2.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between text-xs font-medium animate-in fade-in duration-150">
            <div className="flex items-center gap-2 truncate">
              <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
              <span className="truncate">
                {checkOut
                  ? `${formatDisplayDate(checkIn, locale)} — ${formatDisplayDate(checkOut, locale)} (${nights} ${locale === 'az' ? 'gecə' : 'nights'})`
                  : `${locale === 'az' ? 'Giriş:' : 'Check-in:'} ${formatDisplayDate(checkIn, locale)} • ${locale === 'az' ? 'Çıxış tarixini seçin' : 'Select check-out date'}`}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearDates}
              className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white cursor-pointer ml-2 flex-shrink-0"
              title={tDetails('clearDates')}
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* Calendar Box (Clean, Borderless Numbers like Airbnb) */}
        <div className="pt-2 pb-1">
          {/* Centered Month Header with Navigation */}
          <div className="flex items-center justify-between mb-4 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={!canGoPrev}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-base font-bold text-gray-900 tracking-tight">
              {currentMonthLabel}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Conflict Error Message */}
          {errorMsg && (
            <div className="mb-2 p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center mb-2">
            {weekDays.map((wd, i) => (
              <span
                key={i}
                className="text-[12px] font-medium text-gray-500 py-1"
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid - Clean Typography like Airbnb */}
          <div className="grid grid-cols-7 gap-y-1.5 text-center">
            {calendarDays.map((day) => {
              if (day.empty) {
                return <div key={day.id} className="h-9 w-9" />;
              }

              // Selected Check-In or Check-Out (Solid Black Circle)
              if (day.isCheckIn || day.isCheckOut) {
                return (
                  <div key={day.id} className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className="h-9 w-9 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-105"
                    >
                      {day.dayNumber}
                    </button>
                  </div>
                );
              }

              // In-Range between checkIn and checkOut
              if (day.isInRange) {
                return (
                  <div key={day.id} className="flex items-center justify-center bg-gray-100 py-0.5">
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className="h-8 w-full text-gray-900 font-semibold text-sm flex items-center justify-center cursor-pointer hover:bg-gray-200"
                    >
                      {day.dayNumber}
                    </button>
                  </div>
                );
              }

              // Booked / Reserved Date from Airbnb (Crossed out like Airbnb)
              if (day.isBooked) {
                return (
                  <div key={day.id} className="flex items-center justify-center">
                    <span
                      title={locale === 'az' ? 'Airbnb ilə bron edilmişdir (Dolu)' : 'Booked via Airbnb'}
                      className="h-9 w-9 text-gray-400 text-sm font-normal line-through flex items-center justify-center cursor-not-allowed select-none"
                    >
                      {day.dayNumber}
                    </span>
                  </div>
                );
              }

              // Past Date (Crossed out like Airbnb)
              if (day.isPast) {
                return (
                  <div key={day.id} className="flex items-center justify-center">
                    <span className="h-9 w-9 text-gray-300 text-sm font-normal line-through flex items-center justify-center cursor-not-allowed select-none">
                      {day.dayNumber}
                    </span>
                  </div>
                );
              }

              // Available Date (Bold typography, clean hover circle like Airbnb)
              return (
                <div key={day.id} className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleDayClick(day)}
                    className="h-9 w-9 rounded-full text-gray-900 text-sm font-bold hover:border hover:border-black cursor-pointer transition-colors flex items-center justify-center"
                  >
                    {day.dayNumber}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Clear Dates button on right like Airbnb */}
          <div className="mt-4 pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-gray-400" />
                <span>{tDetails('available')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="line-through text-gray-400 font-normal">12</span>
                <span>{tDetails('booked')}</span>
              </span>
            </div>

            {(checkIn || checkOut) && (
              <button
                type="button"
                onClick={handleClearDates}
                className="text-xs font-semibold text-gray-900 underline hover:text-black cursor-pointer"
              >
                {locale === 'az' ? 'Tarixləri təmizlə' : 'Clear dates'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── TRANSFER SELECTION ─────────────────────────────────────── */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Car size={15} className="text-gray-900" />
          <span>{tDetails('transfer')}</span>
        </div>

        <div className="relative" ref={transferDropdownRef}>
          <button
            type="button"
            onClick={() => setIsTransferOpen(!isTransferOpen)}
            className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50/60 hover:bg-gray-50 focus:ring-2 focus:ring-black focus:border-transparent outline-none cursor-pointer transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {currentTransferLabel}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-transform duration-200 flex-shrink-0 ml-2 ${
                isTransferOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isTransferOpen && (
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="divide-y divide-gray-100">
                {carOptions.map((opt) => {
                  const isSelected = selectedCar === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setSelectedCar(opt.key);
                        setIsTransferOpen(false);
                      }}
                      className={`cursor-pointer w-full p-3 text-left text-sm flex items-center justify-between transition-colors duration-150 hover:bg-gray-50 ${
                        isSelected ? 'bg-gray-50/80 font-semibold text-black' : 'text-gray-700'
                      }`}
                    >
                      <span className="truncate pr-2">{opt.label}</span>
                      {isSelected && (
                        <Check size={16} className="text-black flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── ACTION BUTTONS ─────────────────────────────────────────── */}
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/994552904045?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-3 cursor-pointer rounded-xl bg-black duration-200 hover:bg-neutral-800 py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:shadow-xl transition-all text-center"
      >
        {tDetails('reserveNow')}
      </a>

      {/* Pre-payment / Deposit Button */}
      <button
        onClick={handleDeposit}
        disabled={loadingPayment}
        className="cursor-pointer hover:bg-black hover:text-white duration-200 w-full rounded-xl border-2 border-black py-3 px-6 text-sm font-bold uppercase tracking-wider text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center"
      >
        {loadingPayment ? tDetails('loading') : tDetails('payPrePayment')}
      </button>
    </div>
  );
}
