'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';

// Run layout effects only in the browser (avoids the SSR warning)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Long text clamped to a few lines with a "Read more" toggle (mobile and desktop).
// The whole text always stays in the DOM (SEO), only visually clamped via CSS.
// The toggle is only shown when the text is actually cut off at the current screen size.
export default function ExpandableText({ text, lines = 6, linesDesktop = 8 }) {
  const t = useTranslations('Details');
  const [open, setOpen] = useState(false);
  const [truncated, setTruncated] = useState(true); // true until measured, so the button is there without JS
  const ref = useRef(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      // Only measurable while clamped; when open the button must stay so the text can be collapsed again
      if (open) return;
      setTruncated(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text, lines, linesDesktop, open]);

  const clamp = open ? '' : 'line-clamp-[var(--lines)] lg:line-clamp-[var(--lines-lg)]';

  return (
    <div>
      <p
        ref={ref}
        style={{ '--lines': lines, '--lines-lg': linesDesktop }}
        className={`text-gray-700 text-base lg:text-lg leading-relaxed whitespace-pre-line ${clamp}`}
      >
        {text}
      </p>
      {(truncated || open) && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3 text-sm lg:text-base font-semibold text-gray-900 underline underline-offset-4 cursor-pointer"
        >
          {open ? t('readLess') : t('readMore')}
        </button>
      )}
    </div>
  );
}
