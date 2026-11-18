'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Long text clamped to a few lines with a "Read more" toggle (mobile and desktop).
// The whole text always stays in the DOM (SEO), only visually clamped via CSS.
export default function ExpandableText({ text, lines = 6, linesDesktop = 8 }) {
  const t = useTranslations('Details');
  const [open, setOpen] = useState(false);

  const clamp = open ? '' : 'line-clamp-[var(--lines)] lg:line-clamp-[var(--lines-lg)]';

  return (
    <div>
      <p
        style={{ '--lines': lines, '--lines-lg': linesDesktop }}
        className={`text-gray-700 text-base lg:text-lg leading-relaxed whitespace-pre-line ${clamp}`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 text-sm lg:text-base font-semibold text-gray-900 underline underline-offset-4 cursor-pointer"
      >
        {open ? t('readLess') : t('readMore')}
      </button>
    </div>
  );
}
