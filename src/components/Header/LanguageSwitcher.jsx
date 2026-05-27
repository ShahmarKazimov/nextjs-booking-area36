"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-3.5 rounded-sm shadow-sm inline-block shrink-0">
    <rect width="50" height="30" fill="#012169" />
    <path d="M0 0 L50 30 M50 0 L0 30" stroke="#FFFFFF" strokeWidth="6" />
    <path d="M0 0 L50 30 M50 0 L0 30" stroke="#C8102E" strokeWidth="2.5" />
    <path d="M25 0 V30 M0 15 H50" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M25 0 V30 M0 15 H50" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const AZFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" className="w-5 h-3.5 rounded-sm shadow-sm inline-block shrink-0">
    <rect width="50" height="10" fill="#00B5E2" />
    <rect y="10" width="50" height="10" fill="#EF3340" />
    <rect y="20" width="50" height="10" fill="#50B848" />
    <circle cx="23" cy="15" r="3.8" fill="#FFFFFF" />
    <circle cx="24.6" cy="15" r="3" fill="#EF3340" />
    <rect x="25.8" y="13.8" width="2.4" height="2.4" fill="#FFFFFF" />
    <rect x="25.8" y="13.8" width="2.4" height="2.4" fill="#FFFFFF" transform="rotate(45 27 15)" />
  </svg>
);

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
    { code: "en", name: "EN", flag: <UKFlag /> },
    { code: "az", name: "AZ", flag: <AZFlag /> }
  ];

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm gap-1.5 px-3 py-[0.667rem] rounded-lg hover:text-white/75 border border-white/10 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentLang.flag}
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
                {lang.flag}
                <span className="leading-none">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

