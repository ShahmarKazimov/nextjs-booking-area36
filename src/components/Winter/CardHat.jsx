import { winterEffects, isWinter } from "@/config/winterEffects";

// Kartın sağ-yuxarı küncünə "geyindirilmiş" papaq: zolaq küncü qucaqlayır, pom-pom aşağı sallanır.
// Yalnız konfiqurasiyada seçilmiş kartlarda göstərilir. Valideyn `relative` olmalıdır.
export default function CardHat({ slug, isPartner = false }) {
  if (!isWinter("cardHats")) return null;
  const { slugs, partners } = winterEffects.cardHats;
  if (!slugs.includes(slug) && !(partners && isPartner)) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 48 38"
      className="pointer-events-none absolute z-20 w-[34px] h-auto"
      style={{
        // zolağın mərkəzi kartın sağ-yuxarı küncünə düşür, papaq küncün diaqonalı boyunca əyilir
        top: "-14px",
        right: "-18px",
        transformOrigin: "37.5% 64.5%",
        transform: "rotate(45deg)",
        filter: "drop-shadow(0 1px 1.5px rgba(0,0,0,.25))",
      }}
    >
      <defs>
        <linearGradient id="chRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d12a33" />
          <stop offset="1" stopColor="#8a0f17" />
        </linearGradient>
        <linearGradient id="chFur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4e4ea" />
        </linearGradient>
      </defs>
      {/* gövdə: gümbəz + sağa sallanan uc */}
      <path d="M6 22C4 8 17 1 29 4c8 2 13 10 14 22l-6 2c-1-6-5-9-10-9z" fill="url(#chRed)" />
      <path d="M11 19C11 11 17 6 25 6c-6 2-9 7-9 13z" fill="#ef5b64" opacity=".35" />
      {/* qalın tüklü zolaq */}
      <rect x="1.5" y="18" width="33" height="13" rx="6.5" fill="url(#chFur)" />
      {/* pom-pom */}
      <circle cx="41" cy="28" r="5.2" fill="url(#chFur)" />
    </svg>
  );
}
