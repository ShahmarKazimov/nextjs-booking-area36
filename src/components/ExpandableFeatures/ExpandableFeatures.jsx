'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Shows the first `limit` items and a "Show all N" button (collapsed by default).
export default function ExpandableFeatures({ items, limit = 8 }) {
  const t = useTranslations('Details');
  const [open, setOpen] = useState(false);
  const visible = open ? items : items.slice(0, limit);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">{visible}</div>
      {items.length > limit && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 w-full rounded-xl border border-gray-900 py-3 px-6 text-sm sm:text-base font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          {open ? t('showLessFeatures') : t('showAllFeatures', { count: items.length })}
        </button>
      )}
    </>
  );
}
