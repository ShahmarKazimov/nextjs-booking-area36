import { isWinter } from "@/config/winterEffects";

// Logo üzərindəki dağ zirvəsinə qoyulan kiçik dekorativ Santa papağı.
// Orijinal logo faylına toxunulmur; valideyn `relative` olmalıdır.
export default function SantaHat({ top = -13 }) {
  if (!isWinter("santaHat")) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 40 34"
      className="pointer-events-none absolute z-10 w-[26px] h-auto"
      style={{ left: "31%", top: `${top}px`, transform: "translateX(-50%) rotate(-12deg)" }}
    >
      <path d="M4 28C6 12 16 3 30 5c3 .5 5 3 4 6-1 2-3 2-4 1-5-1-9 3-9 16H4z" fill="#b3202a" />
      <path d="M4 28C6 14 14 6 24 5c-6 4-9 12-9 23H4z" fill="#d12f3a" opacity=".55" />
      <rect x="2" y="24" width="26" height="7" rx="3.5" fill="#fff" />
      <circle cx="33" cy="9" r="3.6" fill="#fff" />
    </svg>
  );
}
