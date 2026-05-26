"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const languages = [
    { code: "en", name: "EN", flag: "🇬🇧" },
    { code: "az", name: "AZ", flag: "🇦🇿" }
  ];

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="leading-none">{currentLang.name}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-max rounded-xl bg-black/90 border border-white/10 backdrop-blur-lg shadow-2xl overflow-hidden z-[9999] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors hover:bg-white/10 cursor-pointer ${locale === lang.code ? "text-blue-400 font-bold bg-white/5" : "text-white/80"
                  }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="leading-none">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
