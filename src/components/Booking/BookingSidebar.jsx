'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import FrostFrame from '../Winter/FrostFrame';

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

const RU_MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const RU_MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

// Russian plural: 1 ночь, 2-4 ночи, 5+ ночей
function ruPlural(n, one, few, many) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
}
function nightsWord(n, locale) {
  if (locale === 'az') return 'gecə';
  if (locale === 'ru') return ruPlural(n, 'ночь', 'ночи', 'ночей');
  return n === 1 ? 'night' : 'nights';
}
function monthName(locale, idx) {
  return (locale === 'az' ? AZ_MONTHS : locale === 'ru' ? RU_MONTHS : EN_MONTHS)[idx];
}

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
  const name = locale === 'ru' ? RU_MONTHS_GEN[monthIdx] : monthName(locale, monthIdx);
  return `${day} ${name} ${year}`;
}

// dd.mm.yyyy for the compact desktop date fields
function formatNumericDate(dateStr) {
  const d = parseDateStr(dateStr);
  if (!d) return '';
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

function formatShortDate(dateStr, locale) {
  const d = parseDateStr(dateStr);
  if (!d) return '';
  const name = locale === 'ru' ? RU_MONTHS_GEN[d.getMonth()] : monthName(locale, d.getMonth());
  return `${d.getDate()} ${name.toLowerCase()}`;
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="flex-shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function BookingSidebar({
  homeTitle,
  location,
  slug,
  airbnbUrl,
  hasBeds24 = false,
  pricePerNight = null,
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
  // Per-night price shown at the top before dates are chosen: Beds24 offer for the next free stay
  const [samplePrice, setSamplePrice] = useState(null);
  const [calendarError, setCalendarError] = useState(false);
  // Desktop only: the calendar and guests picker open as popovers under the date fields
  const [calOpen, setCalOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const popRef = useRef(null);

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

  // Mobile: reserve space under the page for the fixed booking bar
  useEffect(() => {
    document.body.classList.add('has-mobile-book-bar');
    return () => document.body.classList.remove('has-mobile-book-bar');
  }, []);

  // Desktop popovers: close on outside click / Escape
  useEffect(() => {
    if (!calOpen && !guestsOpen) return;
    function onDown(e) {
      if (typeof window === 'undefined' || window.innerWidth < 1024) return;
      if (popRef.current && !popRef.current.contains(e.target)) {
        setCalOpen(false);
        setGuestsOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        setCalOpen(false);
        setGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [calOpen, guestsOpen]);

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

  // No dates yet: ask Beds24 for the price of the next free stay (its min-stay nights), per night
  useEffect(() => {
    if (!hasBeds24 || !hasCalendar || isLoadingCalendar) return;
    const free = (d) => !bookedDates.has(toDateString(d));
    const start = new Date(today);
    let found = null;
    for (let i = 0; i < 365 && !found; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const need = minStays[toDateString(d)] || 1;
      let ok = true;
      for (let k = 0; k < need; k++) {
        const n = new Date(d);
        n.setDate(n.getDate() + k);
        if (!free(n)) {
          ok = false;
          break;
        }
      }
      if (ok) found = { arrival: d, nightsCount: need };
    }
    if (!found) return;
    const dep = new Date(found.arrival);
    dep.setDate(dep.getDate() + found.nightsCount);
    let cancelled = false;
    const qs = new URLSearchParams({
      slug,
      arrival: toDateString(found.arrival),
      departure: toDateString(dep),
      adults: '2',
      children: '0',
    });
    fetch(`/api/offer?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.success && data.available && data.price > 0) {
          setSamplePrice(data.price / found.nightsCount);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [hasBeds24, hasCalendar, isLoadingCalendar, bookedDates, minStays, today, slug]);

  const guestLimit = maxPeople || 10;

  // Dates chosen in the home-page search arrive as ?arrival&departure&adults&children: pre-fill once
  const prefilled = useRef(false);
  useEffect(() => {
    if (prefilled.current || isLoadingCalendar || !hasCalendar || typeof window === 'undefined') return;
    prefilled.current = true;
    const sp = new URLSearchParams(window.location.search);
    const a = sp.get('arrival');
    const d = sp.get('departure');
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if (!re.test(a || '') || !re.test(d || '') || a < toDateString(today) || d <= a) return;
    const n = Math.round((parseDateStr(d) - parseDateStr(a)) / 86400000);
    for (let k = 0; k < n; k++) {
      const night = parseDateStr(a);
      night.setDate(night.getDate() + k);
      if (bookedDates.has(toDateString(night))) return;
    }
    if ((minStays[a] || 1) > n) return;
    const ad = Math.max(1, parseInt(sp.get('adults') || '2', 10) || 2);
    const ch = Math.max(0, parseInt(sp.get('children') || '0', 10) || 0);
    setCheckIn(a);
    setCheckOut(d);
    setSelectingStep('checkIn');
    setAdults(Math.min(ad, guestLimit));
    setChildren(Math.min(ch, Math.max(0, guestLimit - Math.min(ad, guestLimit))));
    const v = parseDateStr(a);
    setViewYear(v.getFullYear());
    setViewMonth(v.getMonth());
  }, [isLoadingCalendar, hasCalendar, bookedDates, minStays, today, guestLimit]);
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
            : locale === 'ru'
              ? 'В выбранный период входят занятые даты. Пожалуйста, выберите другой период.'
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
            : locale === 'ru'
              ? `Минимальный срок проживания на эту дату: ${minNights} ${ruPlural(minNights, 'ночь', 'ночи', 'ночей')}.`
              : `Minimum stay for this date is ${minNights} nights.`
        );
        return;
      }

      // Valid range selected!
      setCheckOut(clickedStr);
      setSelectingStep('checkIn');
      setErrorMsg(null);
      setCalOpen(false);
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
    return `${monthName(locale, viewMonth)} ${viewYear}`;
  }, [viewYear, viewMonth, locale]);

  // Weekday initials matching Airbnb (Monday to Sunday)
  const weekDays = locale === 'az'
    ? ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B']
    : locale === 'ru'
      ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Structured WhatsApp Message Composer
  const waText = useMemo(() => {
    const isAz = locale === 'az';
    const checkInDisplay = checkIn ? formatDisplayDate(checkIn, locale) : null;
    const checkOutDisplay = checkOut ? formatDisplayDate(checkOut, locale) : null;

    if (locale === 'ru') {
      if (checkInDisplay && checkOutDisplay) {
        return `Здравствуйте, пишу с сайта Area36.az.

🏡 Вилла: ${homeTitle}
📍 Расположение: ${location}
📅 Заезд: ${checkInDisplay}
📅 Выезд: ${checkOutDisplay}
🌙 Срок: ${nights} ${ruPlural(nights, 'ночь', 'ночи', 'ночей')}

Пожалуйста, подтвердите доступность и цену на эти даты.`;
      }
      return `Здравствуйте, пишу с сайта Area36.az.

🏡 Вилла: ${homeTitle}
📍 Расположение: ${location}

Пожалуйста, пришлите подробную информацию о вилле и свободных датах.`;
    }

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
  const nightsLabel = `${nights} ${nightsWord(nights, locale)}`;
  const barPrice =
    hasBeds24 && offerStatus === 'ok'
      ? `₼ ${offerPrice}`
      : hasBeds24 && offerStatus === 'loading'
        ? '…'
        : nightsLabel;
  const waHref = `https://wa.me/994552904045?text=${encodeURIComponent(waText)}`;

  const isAz = locale === 'az';
  const showGuests = hasBeds24 && hasCalendar;

  // Top price comes from Beds24 only (never the static homes.js price) for Beds24 homes:
  // chosen dates -> the offer total / nights; otherwise the next free stay's per-night price.
  const fmtMoney = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
  let topPrice = null;
  if (!hasBeds24) topPrice = pricePerNight;
  else if (hasDates && offerStatus === 'ok' && offerPrice > 0) topPrice = offerPrice / nights;
  else if (!hasDates) topPrice = samplePrice;
  const topPriceLoading = hasBeds24 && hasDates && offerStatus === 'loading';

  // Adults / children steppers (shared by the mobile sheet and the desktop popover)
  function renderGuests() {
    return (
      <div className="space-y-2">
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
            {isAz ? `Maksimum ${maxPeople} qonaq` : locale === 'ru' ? `Максимум ${maxPeople} ${ruPlural(maxPeople, 'гость', 'гостя', 'гостей')}` : `Maximum ${maxPeople} guests`}
          </p>
        )}
      </div>
    );
  }

  function openCheckIn() {
    setSelectingStep('checkIn');
    setGuestsOpen(false);
    setCalOpen(true);
  }

  function openCheckOut() {
    if (checkIn) {
      setCheckOut(null);
      setSelectingStep('checkOut');
    } else {
      setSelectingStep('checkIn');
    }
    setGuestsOpen(false);
    setCalOpen(true);
  }

  const fieldBase =
    'text-left px-4 py-2.5 cursor-pointer transition-colors hover:bg-[#f6f4ee] focus:outline-none focus-visible:bg-[#f6f4ee]';
  const fieldLabel = 'block text-[10px] font-bold uppercase tracking-wide text-gray-900';
  const fieldValue = (v) =>
    v ? 'block text-sm text-gray-900 mt-0.5' : 'block text-sm text-gray-400 mt-0.5';

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
        className={`isolate bg-white px-6 pt-6 pb-6 border border-gray-100 max-lg:fixed max-lg:inset-0 max-lg:z-[1000] max-lg:h-dvh max-lg:overflow-y-auto max-lg:rounded-none max-lg:border-0 max-lg:pb-0 ${
          sheetOpen ? 'max-lg:block' : 'max-lg:hidden'
        } lg:rounded-3xl lg:shadow-sm lg:sticky lg:top-8`}
      >
      <FrostFrame />
      {/* Single header: dates once chosen, otherwise a short prompt (+ close on mobile) */}
      <div className="flex items-start justify-between mb-4 lg:hidden">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {hasDates ? rangeLabel : (locale === 'az' ? 'Tarixləri seçin' : locale === 'ru' ? 'Выберите даты' : 'Select dates')}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {hasDates
              ? `${nightsLabel} · ${homeTitle}`
              : locale === 'az'
                ? 'Dəqiq rezervasiya üçün tarixlərinizi seçin'
                : locale === 'ru'
                  ? 'Укажите даты поездки, чтобы увидеть точную доступность'
                  : 'Add your travel dates for exact availability'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSheetOpen(false)}
          className="lg:hidden w-10 h-10 rounded-full bg-[#efede8] hover:bg-[#e6e2da] text-gray-900 flex items-center justify-center flex-shrink-0 ml-3 cursor-pointer"
          aria-label={(locale === 'az' ? 'Bağla' : locale === 'ru' ? 'Закрыть' : 'Close')}
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
      {/* DESKTOP: price, compact date + guest fields, popovers */}
      {(topPrice != null || topPriceLoading) && (
        <div className="max-lg:hidden mb-4 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            ₼ {topPrice != null && !topPriceLoading ? fmtMoney(topPrice) : '…'}
          </span>
          <span className="text-sm text-gray-500">/ {(isAz ? 'gecə' : locale === 'ru' ? 'ночь' : 'night')}</span>
        </div>
      )}
      {calendarError && (
        <div className="max-lg:hidden mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs" role="alert">
          {tDetails('calendarUnavailable')}
        </div>
      )}

      <div ref={popRef} className="lg:relative">
        {!noCalendar && (
          <div className="max-lg:hidden mb-4 rounded-2xl border border-[#d9d4c8] bg-white">
            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={openCheckIn}
                className={`${fieldBase} rounded-tl-2xl border-r border-[#d9d4c8] ${calOpen && selectingStep === 'checkIn' ? 'bg-[#f1efe7] shadow-[inset_0_0_0_2px_#2d4a2b]' : ''}`}
                aria-haspopup="dialog"
                aria-expanded={calOpen}
              >
                <span className={fieldLabel}>{(isAz ? 'Giriş' : locale === 'ru' ? 'Заезд' : 'Check-in')}</span>
                <span className={fieldValue(checkIn)}>
                  {checkIn ? formatNumericDate(checkIn) : (isAz ? 'Tarix əlavə edin' : locale === 'ru' ? 'Добавьте дату' : 'Add date')}
                </span>
              </button>
              <button
                type="button"
                onClick={openCheckOut}
                className={`${fieldBase} rounded-tr-2xl ${calOpen && selectingStep === 'checkOut' ? 'bg-[#f1efe7] shadow-[inset_0_0_0_2px_#2d4a2b]' : ''}`}
                aria-haspopup="dialog"
                aria-expanded={calOpen}
              >
                <span className={fieldLabel}>{(isAz ? 'Çıxış' : locale === 'ru' ? 'Выезд' : 'Check-out')}</span>
                <span className={fieldValue(checkOut)}>
                  {checkOut ? formatNumericDate(checkOut) : (isAz ? 'Tarix əlavə edin' : locale === 'ru' ? 'Добавьте дату' : 'Add date')}
                </span>
              </button>
            </div>
            {showGuests && (
              <div className="relative border-t border-[#d9d4c8]">
                <button
                  type="button"
                  onClick={() => {
                    setCalOpen(false);
                    setGuestsOpen((v) => !v);
                  }}
                  className={`${fieldBase} flex w-full items-center justify-between rounded-b-2xl ${guestsOpen ? 'bg-[#f1efe7] shadow-[inset_0_0_0_2px_#2d4a2b]' : ''}`}
                  aria-haspopup="dialog"
                  aria-expanded={guestsOpen}
                >
                  <span>
                    <span className={fieldLabel}>{(isAz ? 'Qonaqlar' : locale === 'ru' ? 'Гости' : 'Guests')}</span>
                    <span className="block text-sm text-gray-900 mt-0.5">
                      {isAz
                        ? `${totalGuests} qonaq`
                        : locale === 'ru'
                          ? `${totalGuests} ${ruPlural(totalGuests, 'гость', 'гостя', 'гостей')}`
                          : `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`}
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-700 transition-transform ${guestsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {guestsOpen && (
                  <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-[#d9d4c8] bg-white p-4 shadow-xl">
                    {renderGuests()}
                    <div className="mt-3 text-right">
                      <button
                        type="button"
                        onClick={() => setGuestsOpen(false)}
                        className="text-sm font-semibold text-gray-900 underline cursor-pointer"
                      >
                        {(isAz ? 'Bağla' : locale === 'ru' ? 'Закрыть' : 'Close')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      <div
        className={`mb-6 lg:mb-0 ${calOpen ? '' : 'lg:hidden'} lg:absolute lg:left-0 lg:right-0 lg:top-[72px] lg:z-30 lg:rounded-2xl lg:border lg:border-[#d9d4c8] lg:bg-white lg:p-4 lg:shadow-xl`}
        role="dialog"
        aria-label={(isAz ? 'Tarix seçimi' : locale === 'ru' ? 'Выберите даты' : 'Select dates')}
      >
        {/* Selected Dates Summary Badge */}
        {checkIn && (
          <div className="lg:hidden mb-3 p-2.5 rounded-xl bg-[#2d4a2b] text-white flex items-center justify-between text-xs font-medium animate-in fade-in duration-150">
            <div className="flex items-center gap-2 truncate">
              <span className="truncate">
                {checkOut
                  ? `${formatDisplayDate(checkIn, locale)} — ${formatDisplayDate(checkOut, locale)} (${nights} ${nightsWord(nights, locale)})`
                  : `${(locale === 'az' ? 'Giriş:' : locale === 'ru' ? 'Заезд:' : 'Check-in:')} ${formatDisplayDate(checkIn, locale)} • ${(locale === 'az' ? 'Çıxış tarixini seçin' : locale === 'ru' ? 'Выберите дату выезда' : 'Select check-out date')}`}
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
            <div className="lg:hidden mb-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs" role="alert">
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
                      title={(locale === 'az' ? 'Çıxış günü kimi seçilə bilər' : locale === 'ru' ? 'Можно выбрать как день выезда' : 'Can be selected as check-out')}
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
                      title={(locale === 'az' ? 'Airbnb ilə bron edilmişdir (Dolu)' : locale === 'ru' ? 'Забронировано через Airbnb' : 'Booked via Airbnb')}
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

            <div className="flex items-center gap-4">
              {(checkIn || checkOut) && (
                <button
                  type="button"
                  onClick={handleClearDates}
                  className="text-xs font-semibold text-gray-900 underline hover:text-black cursor-pointer"
                >
                  {(locale === 'az' ? 'Tarixləri təmizlə' : locale === 'ru' ? 'Сбросить даты' : 'Clear dates')}
                </button>
              )}
              <button
                type="button"
                onClick={() => setCalOpen(false)}
                className="max-lg:hidden text-xs font-semibold text-gray-900 underline hover:text-black cursor-pointer"
              >
                {(isAz ? 'Bağla' : locale === 'ru' ? 'Закрыть' : 'Close')}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {showGuests && <div className="mb-5 lg:hidden">{renderGuests()}</div>}

      <div className="max-lg:sticky max-lg:bottom-0 max-lg:-mx-6 max-lg:px-6 max-lg:pt-3 max-lg:pb-4 max-lg:bg-white max-lg:border-t max-lg:border-gray-100">
      {/* ── ACTION BUTTONS ─────────────────────────────────────────── */}
      {hasBeds24 && checkIn && checkOut && nights > 0 && (
      <div className="mb-3 flex items-center justify-between rounded-xl bg-[#edeae4] border border-[#e0dcd4] px-4 py-3 text-sm">
        <span className="text-gray-600">
          {nights} {nightsWord(nights, locale)}
        </span>
        <span className="font-bold text-gray-900">
          {offerStatus === 'loading' && '…'}
          {offerStatus === 'ok' && `${(locale === 'az' ? 'Cəmi' : locale === 'ru' ? 'Итого' : 'Total')}: ₼ ${offerPrice}`}
          {offerStatus === 'unavailable' &&
            ((locale === 'az' ? 'Bu tarixlər üçün qiymət yoxdur' : locale === 'ru' ? 'На эти даты цены нет' : 'No price for these dates'))}
          {offerStatus === 'error' && tDetails('calendarUnavailable')}
        </span>
      </div>
    )}

      {hasBeds24 && (
        <button
          type="button"
          onClick={handleContinue}
          disabled={nights < 1}
          className="block w-full mb-3 cursor-pointer rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] duration-200 py-3.5 px-6 text-sm sm:text-base font-semibold transition-all text-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#2d4a2b]"
        >
          {nights < 1 ? tDetails('selectDatesToContinue') : tDetails('continueBooking')}
        </button>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/994552904045?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={
          hasBeds24
            ? 'flex items-center justify-center gap-2 py-1 text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-gray-900 cursor-pointer'
            : 'flex w-full items-center justify-center gap-2 mb-3 cursor-pointer rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] duration-200 py-3.5 px-6 text-sm sm:text-base font-semibold transition-all text-center'
        }
      >
        <WhatsAppIcon size={hasBeds24 ? 16 : 18} />
        {tDetails('askOnWhatsApp')}
      </a>
      </div>
      </div>

      {/* Mobile booking bar: fixed to the bottom of the screen (page gets bottom padding, see globals.css) */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
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
