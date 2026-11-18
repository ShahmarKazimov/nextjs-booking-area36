'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';

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

function formatShortDate(dateStr, locale) {
  const d = parseDateStr(dateStr);
  if (!d) return '';
  const monthName = locale === 'az' ? AZ_MONTHS[d.getMonth()] : EN_MONTHS[d.getMonth()];
  return `${d.getDate()} ${monthName.toLowerCase()}`;
}

export default function BookingSidebar({
  homeTitle,
  location,
  slug,
  airbnbUrl,
  hasBeds24 = false,
}) {
  const router = useRouter();
  const tDetails = useTranslations('Details');
  const locale = useLocale();

  // Calendar State
  const [bookedDates, setBookedDates] = useState(new Set());
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);
  const [hasCalendar, setHasCalendar] = useState(false);
  const [minStays, setMinStays] = useState({});
  const [maxPeople, setMaxPeople] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState(null);
  const [offerStatus, setOfferStatus] = useState('idle'); // idle | loading | ok | unavailable | error
  const [calendarError, setCalendarError] = useState(false);

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

  // Lock page scroll while the mobile booking sheet is open
  useEffect(() => {
    if (!sheetOpen || typeof window === 'undefined' || window.innerWidth >= 1024) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  // Fetch Beds24 availability from our API
  useEffect(() => {
    let isMounted = true;

    async function loadCalendar() {
      try {
        setIsLoadingCalendar(true);
        const res = await fetch(`/api/calendar?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();

        if (isMounted) {
          if (data.success) {
            setBookedDates(new Set(data.bookedDates || []));
            setHasCalendar(Boolean(data.hasCalendar));
            setMinStays(data.minStays || {});
            setMaxPeople(data.maxPeople || null);
            setCalendarError(false);
          } else {
            setCalendarError(true);
          }
        }
      } catch (err) {
        console.error('Failed to load calendar:', err);
        if (isMounted) setCalendarError(true);
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

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const d1 = parseDateStr(checkIn);
    const d2 = parseDateStr(checkOut);
    if (!d1 || !d2) return 0;
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  // Final price for the selected stay, straight from Beds24 offers
  useEffect(() => {
    if (!hasBeds24 || !hasCalendar || !checkIn || !checkOut || nights < 1) {
      setOfferStatus('idle');
      setOfferPrice(null);
      return;
    }
    let cancelled = false;
    setOfferStatus('loading');
    const qs = new URLSearchParams({
      slug,
      arrival: checkIn,
      departure: checkOut,
      adults: String(adults),
      children: String(children),
    });
    fetch(`/api/offer?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.success) setOfferStatus('error');
        else if (!data.available) setOfferStatus('unavailable');
        else {
          setOfferPrice(data.price);
          setOfferStatus('ok');
        }
      })
      .catch(() => !cancelled && setOfferStatus('error'));
    return () => {
      cancelled = true;
    };
  }, [hasBeds24, hasCalendar, slug, checkIn, checkOut, nights, adults, children]);

  const guestLimit = maxPeople || 10;
  const totalGuests = adults + children;

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

      // A booked night can still be the check-out (departure) day if every night
      // between the chosen check-in and it is free.
      let isCheckoutOnly = false;
      if (isBooked && !isPast && checkIn && !checkOut && selectingStep === 'checkOut' && dateStr > checkIn) {
        isCheckoutOnly = true;
        const c = parseDateStr(checkIn);
        c.setDate(c.getDate() + 1);
        const e = parseDateStr(dateStr);
        while (c < e) {
          if (bookedDates.has(toDateString(c))) {
            isCheckoutOnly = false;
            break;
          }
          c.setDate(c.getDate() + 1);
        }
      }

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
        isCheckoutOnly,
        isCheckIn,
        isCheckOut,
        isInRange,
        isAvailable: !isPast && !isBooked,
      });
    }

    return days;
  }, [viewYear, viewMonth, today, bookedDates, checkIn, checkOut, selectingStep]);

  // Handle Day Selection
  function handleDayClick(dayItem) {
    if (dayItem.empty || dayItem.isPast || (dayItem.isBooked && !dayItem.isCheckoutOnly)) return;
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

      // Minimum stay (from Beds24) for the check-in night
      const minNights = minStays[checkIn] || 1;
      const nightsCount = Math.round((end - start) / (1000 * 60 * 60 * 24));
      if (nightsCount < minNights) {
        setErrorMsg(
          locale === 'az'
            ? `Bu tarix üçün minimum qalma müddəti ${minNights} gecədir.`
            : `Minimum stay for this date is ${minNights} nights.`
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
    ? ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Structured WhatsApp Message Composer
  const waText = useMemo(() => {
    const isAz = locale === 'az';
    const checkInDisplay = checkIn ? formatDisplayDate(checkIn, locale) : null;
    const checkOutDisplay = checkOut ? formatDisplayDate(checkOut, locale) : null;

    if (isAz) {
      if (checkInDisplay && checkOutDisplay) {
        return `Salam, Area36.az saytından müraciət edirəm.

🏡 Villa: ${homeTitle}
📍 Məkan: ${location}
📅 Giriş tarixi: ${checkInDisplay}
📅 Çıxış tarixi: ${checkOutDisplay}
🌙 Müddət: ${nights} gecə

Zəhmət olmasa bu tarixlər üçün mövcudluğu və qiyməti təsdiq edərdiniz.`;
      }
      return `Salam, Area36.az saytından müraciət edirəm.

🏡 Villa: ${homeTitle}
📍 Məkan: ${location}

Zəhmət olmasa villa haqqında ətraflı məlumat və mövcud tarixlər barədə məlumat verərdiniz.`;
    } else {
      if (checkInDisplay && checkOutDisplay) {
        return `Hello, I am contacting you via Area36.az.

🏡 Villa: ${homeTitle}
📍 Location: ${location}
📅 Check-in date: ${checkInDisplay}
📅 Check-out date: ${checkOutDisplay}
🌙 Duration: ${nights} night(s)

Please confirm availability and price for these dates.`;
      }
      return `Hello, I am contacting you via Area36.az.

🏡 Villa: ${homeTitle}
📍 Location: ${location}

Please provide more information and current availability for this property.`;
    }
  }, [homeTitle, location, checkIn, checkOut, nights, locale]);

  // Next step: Beds24 booking form (rendered inside our own site)
  function handleContinue() {
    if (!checkIn || !checkOut || nights < 1) return;
    const qs = new URLSearchParams({
      checkin: checkIn,
      numnight: String(nights),
      numadult: String(adults),
      numchild: String(children),
    });
    router.push(`/${slug}/book?${qs.toString()}`);
  }

  // Homes without Beds24 IDs have no live availability, so no calendar is shown
  const noCalendar = !isLoadingCalendar && !hasCalendar && !calendarError;

  const hasDates = Boolean(checkIn && checkOut && nights > 0);
  const rangeLabel = hasDates
    ? `${formatShortDate(checkIn, locale)} – ${formatShortDate(checkOut, locale)}`
    : '';
  const nightsLabel = `${nights} ${locale === 'az' ? 'gecə' : nights === 1 ? 'night' : 'nights'}`;
  const barPrice =
    hasBeds24 && offerStatus === 'ok'
      ? `₼ ${offerPrice}`
      : hasBeds24 && offerStatus === 'loading'
        ? '…'
        : nightsLabel;
  const waHref = `https://wa.me/994552904045?text=${encodeURIComponent(waText)}`;

  return (
    <>
      {sheetOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSheetOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`bg-white px-6 pt-6 pb-6 border border-gray-100 max-lg:fixed max-lg:inset-0 max-lg:z-[1000] max-lg:h-dvh max-lg:overflow-y-auto max-lg:rounded-none max-lg:border-0 max-lg:pb-0 ${
          sheetOpen ? 'max-lg:block' : 'max-lg:hidden'
        } lg:rounded-3xl lg:shadow-sm lg:sticky lg:top-8`}
      >
      {/* Single header: dates once chosen, otherwise a short prompt (+ close on mobile) */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {hasDates ? rangeLabel : locale === 'az' ? 'Tarixləri seçin' : 'Select dates'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {hasDates
              ? `${nightsLabel} · ${homeTitle}`
              : locale === 'az'
                ? 'Dəqiq rezervasiya üçün tarixlərinizi seçin'
                : 'Add your travel dates for exact availability'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSheetOpen(false)}
          className="lg:hidden w-10 h-10 rounded-full bg-[#efede8] hover:bg-[#e6e2da] text-gray-900 flex items-center justify-center flex-shrink-0 ml-3 cursor-pointer"
          aria-label={locale === 'az' ? 'Bağla' : 'Close'}
        >
          <X size={18} />
        </button>
      </div>

      {/* ── NO CALENDAR (home has no iCal feed) ─────────────────────── */}
      {noCalendar && (
        <div className="mb-4 p-4 rounded-xl bg-[#edeae4] border border-[#e0dcd4]">
          <h3 className="text-base font-bold text-gray-900">{tDetails('noCalendarTitle')}</h3>
          <p className="text-sm text-gray-700 mt-1">{tDetails('noCalendarText')}</p>
        </div>
      )}
      <div className="mb-6">
        {/* Selected Dates Summary Badge */}
        {checkIn && (
          <div className="mb-3 p-2.5 rounded-xl bg-[#2d4a2b] text-white flex items-center justify-between text-xs font-medium animate-in fade-in duration-150">
            <div className="flex items-center gap-2 truncate">
              <span className="truncate">
                {checkOut
                  ? `${formatDisplayDate(checkIn, locale)} — ${formatDisplayDate(checkOut, locale)} (${nights} ${locale === 'az' ? 'gecə' : 'nights'})`
                  : `${locale === 'az' ? 'Giriş:' : 'Check-in:'} ${formatDisplayDate(checkIn, locale)} • ${locale === 'az' ? 'Çıxış tarixini seçin' : 'Select check-out date'}`}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearDates}
              className="p-1 hover:bg-[#233a22] rounded text-green-100 hover:text-white cursor-pointer ml-2 flex-shrink-0"
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

          {calendarError && (
            <div className="mb-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs" role="alert">
              {tDetails('calendarUnavailable')}
            </div>
          )}

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
                const band =
                  checkIn && checkOut
                    ? day.isCheckIn
                      ? 'bg-[linear-gradient(to_right,transparent_50%,#e3ecdf_50%)]'
                      : 'bg-[linear-gradient(to_right,#e3ecdf_50%,transparent_50%)]'
                    : '';
                return (
                  <div key={day.id} className={`flex items-center justify-center ${band}`}>
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className="h-10 w-10 rounded-full bg-[#2d4a2b] text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                    >
                      {day.dayNumber}
                    </button>
                  </div>
                );
              }

              // In-Range between checkIn and checkOut
              if (day.isInRange) {
                return (
                  <div key={day.id} className="flex items-center justify-center bg-[#e3ecdf]">
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className="h-10 w-full text-gray-900 font-semibold text-sm flex items-center justify-center cursor-pointer"
                    >
                      {day.dayNumber}
                    </button>
                  </div>
                );
              }

              // Booked / Reserved Date from Airbnb (Crossed out like Airbnb)
              if (day.isBooked && day.isCheckoutOnly) {
                return (
                  <div key={day.id} className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      title={locale === 'az' ? 'Çıxış günü kimi seçilə bilər' : 'Can be selected as check-out'}
                      className="h-9 w-9 rounded-full text-gray-500 text-sm font-normal hover:border hover:border-[#2d4a2b] cursor-pointer transition-colors flex items-center justify-center"
                    >
                      {day.dayNumber}
                    </button>
                  </div>
                );
              }

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
                    className="h-9 w-9 rounded-full text-gray-900 text-sm font-bold hover:border hover:border-[#2d4a2b] cursor-pointer transition-colors flex items-center justify-center"
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

      {hasBeds24 && hasCalendar && (
        <div className="mb-5 space-y-2">
          {[
            { key: 'adults', label: tDetails('adults'), value: adults, min: 1, set: setAdults },
            { key: 'children', label: tDetails('children'), value: children, min: 0, set: setChildren },
          ].map((g) => (
            <div key={g.key} className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">{g.label}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => g.set(Math.max(g.min, g.value - 1))}
                  disabled={g.value <= g.min}
                  className="w-8 h-8 rounded-full border border-gray-300 text-gray-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  aria-label={`- ${g.label}`}
                >
                  −
                </button>
                <span className="w-5 text-center font-semibold">{g.value}</span>
                <button
                  type="button"
                  onClick={() => g.set(g.value + 1)}
                  disabled={totalGuests >= guestLimit}
                  className="w-8 h-8 rounded-full border border-gray-300 text-gray-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  aria-label={`+ ${g.label}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          {maxPeople && (
            <p className="text-xs text-gray-500">
              {locale === 'az' ? `Maksimum ${maxPeople} qonaq` : `Maximum ${maxPeople} guests`}
            </p>
          )}
        </div>
      )}

      <div className="max-lg:sticky max-lg:bottom-0 max-lg:-mx-6 max-lg:px-6 max-lg:pt-3 max-lg:pb-4 max-lg:bg-white max-lg:border-t max-lg:border-gray-100">
      {/* ── ACTION BUTTONS ─────────────────────────────────────────── */}
      {hasBeds24 && checkIn && checkOut && nights > 0 && (
      <div className="mb-3 flex items-center justify-between rounded-xl bg-[#edeae4] border border-[#e0dcd4] px-4 py-3 text-sm">
        <span className="text-gray-600">
          {nights} {locale === 'az' ? 'gecə' : nights === 1 ? 'night' : 'nights'}
        </span>
        <span className="font-bold text-gray-900">
          {offerStatus === 'loading' && '…'}
          {offerStatus === 'ok' && `${locale === 'az' ? 'Cəmi' : 'Total'}: ₼ ${offerPrice}`}
          {offerStatus === 'unavailable' &&
            (locale === 'az' ? 'Bu tarixlər üçün qiymət yoxdur' : 'No price for these dates')}
          {offerStatus === 'error' && tDetails('calendarUnavailable')}
        </span>
      </div>
    )}

      {hasBeds24 && (
        <button
          type="button"
          onClick={handleContinue}
          disabled={nights < 1}
          className="block w-full mb-3 cursor-pointer rounded-xl bg-neutral-900 text-white hover:bg-black duration-200 py-3.5 px-6 text-sm sm:text-base font-semibold transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nights < 1 ? tDetails('selectDatesToContinue') : tDetails('continueBooking')}
        </button>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/994552904045?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-3 cursor-pointer rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] duration-200 py-3.5 px-6 text-sm sm:text-base font-semibold transition-all text-center"
      >
        {tDetails('askOnWhatsApp')}
      </a>
      </div>
      </div>

      {/* Mobile booking block (sits in the page flow, right after the amenities) */}
      <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {hasDates ? (
            <>
              <p className="text-base font-bold text-gray-900 truncate">{barPrice}</p>
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="text-xs text-gray-600 underline truncate cursor-pointer"
              >
                {rangeLabel}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-gray-900 truncate">{homeTitle}</p>
            </>
          )}
        </div>

        {!hasDates ? (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="rounded-xl bg-[#2d4a2b] text-white px-5 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer"
          >
            {tDetails('checkAvailability')}
          </button>
        ) : hasBeds24 ? (
          <button
            type="button"
            onClick={handleContinue}
            className="rounded-xl bg-[#2d4a2b] text-white px-5 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer"
          >
            {tDetails('reserveNow')}
          </button>
        ) : (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#2d4a2b] text-white px-5 py-3 text-sm font-semibold whitespace-nowrap"
          >
            {tDetails('askOnWhatsApp')}
          </a>
        )}
      </div>

    </>
  );
}
