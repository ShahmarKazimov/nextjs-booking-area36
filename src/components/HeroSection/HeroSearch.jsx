'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react';

const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const RE = /^\d{4}-\d{2}-\d{2}$/;

const TXT = {
  az: {
    checkIn: 'Giriş',
    checkOut: 'Çıxış',
    guests: 'Qonaq',
    add: 'Tarix seçin',
    search: 'Axtar',
    clear: 'Təmizlə',
    adults: 'Böyüklər',
    children: 'Uşaqlar',
    months: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    days: ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'],
    guestWord: (n) => `${n} qonaq`,
    nights: (n) => `${n} gecə`,
  },
  en: {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    add: 'Add date',
    search: 'Search',
    clear: 'Clear',
    adults: 'Adults',
    children: 'Children',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    guestWord: (n) => `${n} guest${n > 1 ? 's' : ''}`,
    nights: (n) => `${n} night${n > 1 ? 's' : ''}`,
  },
};

export default function HeroSearch() {
  const locale = useLocale();
  const L = TXT[locale === 'az' ? 'az' : 'en'];
  const router = useRouter();
  const sp = useSearchParams();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const urlIn = sp.get('arrival');
  const urlOut = sp.get('departure');
  const [checkIn, setCheckIn] = useState(RE.test(urlIn || '') ? urlIn : null);
  const [checkOut, setCheckOut] = useState(RE.test(urlOut || '') ? urlOut : null);
  const [adults, setAdults] = useState(Math.min(30, Math.max(1, parseInt(sp.get('adults') || '2', 10) || 2)));
  const [children, setChildren] = useState(Math.min(30, Math.max(0, parseInt(sp.get('children') || '0', 10) || 0)));
  const [open, setOpen] = useState(null); // null | 'cal' | 'guests'
  const [step, setStep] = useState('in');
  const [hover, setHover] = useState(null);
  const [viewY, setViewY] = useState(today.getFullYear());
  const [viewM, setViewM] = useState(today.getMonth());
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const down = (e) => ref.current && !ref.current.contains(e.target) && setOpen(null);
    const key = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const shift = (delta) => {
    const d = new Date(viewY, viewM + delta, 1);
    setViewY(d.getFullYear());
    setViewM(d.getMonth());
  };

  const pick = (str) => {
    if (step === 'in' || !checkIn || str <= checkIn) {
      setCheckIn(str);
      setCheckOut(null);
      setStep('out');
    } else {
      setCheckOut(str);
      setStep('in');
      setOpen(null);
    }
  };

  const nights = checkIn && checkOut ? Math.round((parse(checkOut) - parse(checkIn)) / 86400000) : 0;
  const fmt = (s) => {
    const d = parse(s);
    return `${d.getDate()} ${L.months[d.getMonth()].slice(0, 3)}`;
  };

  const renderMonth = (offset) => {
    const base = new Date(viewY, viewM + offset, 1);
    const y = base.getFullYear();
    const m = base.getMonth();
    const first = (new Date(y, m, 1).getDay() + 6) % 7;
    const count = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(<span key={`e${i}`} />);
    for (let d = 1; d <= count; d++) {
      const date = new Date(y, m, d);
      const str = toStr(date);
      const past = date < today;
      const edge = str === checkIn || str === checkOut;
      const end = checkOut || (step === 'out' && checkIn && hover && hover > checkIn ? hover : null);
      const inRange = checkIn && end && str > checkIn && str < end;
      cells.push(
        <button
          key={str}
          type="button"
          disabled={past}
          onClick={() => pick(str)}
          onMouseEnter={() => setHover(str)}
          className={`h-9 w-9 mx-auto rounded-full text-sm transition-colors ${
            past
              ? 'text-gray-300 cursor-not-allowed'
              : edge
                ? 'bg-[#2d4a2b] text-white font-semibold cursor-pointer'
                : inRange
                  ? 'bg-[#e4eadf] text-gray-900 cursor-pointer'
                  : 'text-gray-900 hover:bg-[#edeae4] cursor-pointer'
          }`}
        >
          {d}
        </button>
      );
    }
    return (
      <div className="w-[266px] max-w-full">
        <div className="mb-2 text-center text-sm font-semibold text-gray-900">
          {L.months[m]} {y}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] font-medium text-gray-400 mb-1">
          {L.days.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">{cells}</div>
      </div>
    );
  };

  const submit = () => {
    const query = {};
    if (checkIn && checkOut) {
      query.arrival = checkIn;
      query.departure = checkOut;
      query.adults = String(adults);
      if (children) query.children = String(children);
    }
    router.replace({ pathname: '/', query }, { scroll: false });
    setTimeout(() => document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const clear = () => {
    setCheckIn(null);
    setCheckOut(null);
    setStep('in');
    router.replace({ pathname: '/', query: {} }, { scroll: false });
  };

  const field = 'flex-1 min-w-0 text-left px-3 sm:px-5 py-3 cursor-pointer hover:bg-black/[0.04] transition-colors max-sm:border-b border-[#e0dcd4]';
  const label = 'block text-[10px] sm:text-[11px] font-semibold uppercase tracking-normal sm:tracking-wider truncate text-gray-500';
  const value = (has) => `block truncate text-sm sm:text-base ${has ? 'font-semibold text-gray-900' : 'text-gray-500'}`;

  const stepper = (title, val, set, min) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-900">{title}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set(Math.max(min, val - 1))} disabled={val <= min} className="h-8 w-8 rounded-full border border-gray-300 grid place-items-center disabled:opacity-30 cursor-pointer" aria-label="-">
          <Minus size={14} />
        </button>
        <span className="w-5 text-center text-sm font-semibold">{val}</span>
        <button type="button" onClick={() => set(Math.min(30, val + 1))} className="h-8 w-8 rounded-full border border-gray-300 grid place-items-center cursor-pointer" aria-label="+">
          <Plus size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="relative w-full max-w-3xl mx-auto text-left">
      <div className="grid grid-cols-3 sm:flex sm:flex-row sm:items-stretch rounded-2xl sm:rounded-full bg-white/95 backdrop-blur shadow-2xl sm:divide-x divide-[#e0dcd4]">
        <button type="button" className={`${field} max-sm:rounded-tl-2xl max-sm:border-r sm:rounded-l-full`} onClick={() => { setOpen('cal'); setStep('in'); }}>
          <span className={label}>{L.checkIn}</span>
          <span className={value(checkIn)}>{checkIn ? fmt(checkIn) : L.add}</span>
        </button>
        <button type="button" className={`${field} max-sm:border-r`} onClick={() => { setOpen('cal'); setStep(checkIn ? 'out' : 'in'); }}>
          <span className={label}>{L.checkOut}</span>
          <span className={value(checkOut)}>{checkOut ? fmt(checkOut) : L.add}</span>
        </button>
        <button type="button" className={`${field} max-sm:rounded-tr-2xl`} onClick={() => setOpen(open === 'guests' ? null : 'guests')}>
          <span className={label}>{L.guests}</span>
          <span className={value(true)}>{L.guestWord(adults + children)}</span>
        </button>
        <div className="p-2 flex items-center gap-2 max-sm:col-span-3">
          {checkIn && (
            <button type="button" onClick={clear} className="h-11 w-11 rounded-full grid place-items-center text-gray-500 hover:bg-black/5 cursor-pointer" aria-label={L.clear}>
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={submit}
            disabled={!checkIn || !checkOut}
            className="flex-1 sm:flex-none h-11 px-6 rounded-full bg-[#2d4a2b] hover:bg-[#233a22] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <Search size={16} />
            {L.search}
          </button>
        </div>
      </div>

      {open === 'cal' && (
        <div className="absolute left-0 right-0 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-full mt-3 z-30 rounded-2xl bg-white p-5 shadow-2xl text-gray-900" onMouseLeave={() => setHover(null)}>
          <div className="flex items-start justify-between gap-4">
            <button type="button" onClick={() => shift(-1)} disabled={viewY === today.getFullYear() && viewM === today.getMonth()} className="h-8 w-8 shrink-0 grid place-items-center rounded-full hover:bg-black/5 disabled:opacity-30 cursor-pointer" aria-label="prev">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-8 justify-center min-w-0">
              {renderMonth(0)}
              <div className="hidden sm:block">{renderMonth(1)}</div>
            </div>
            <button type="button" onClick={() => shift(1)} className="h-8 w-8 shrink-0 grid place-items-center rounded-full hover:bg-black/5 cursor-pointer" aria-label="next">
              <ChevronRight size={18} />
            </button>
          </div>
          {nights > 0 && <p className="mt-3 text-center text-xs text-gray-500">{L.nights(nights)}</p>}
        </div>
      )}

      {open === 'guests' && (
        <div className="absolute right-0 top-full mt-3 z-30 w-full sm:w-72 rounded-2xl bg-white p-4 shadow-2xl text-gray-900">
          {stepper(L.adults, adults, setAdults, 1)}
          {stepper(L.children, children, setChildren, 0)}
        </div>
      )}
    </div>
  );
}
