'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Long text: clamped to a few lines on mobile with a "Read more" toggle; full text on desktop.
// The whole text always stays in the DOM (SEO), only visually clamped via CSS.
export default function ExpandableText({ text, lines = 6 }) {
  const t = useTranslations('Details');
  const [open, setOpen] = useState(false);

  const clamp = open ? '' : 'max-lg:line-clamp-[var(--lines)]';

  return (
    <div>
      <p
        style={{ '--lines': lines }}
        className={`text-gray-700 text-base lg:text-lg leading-relaxed whitespace-pre-line ${clamp}`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="lg:hidden mt-3 text-sm font-semibold text-gray-900 underline underline-offset-4 cursor-pointer"
      >
        {open ? t('readLess') : t('readMore')}
      </button>
    </div>
  );
}
