// Mövsümi (qış / Yeni il) effektlərinin mərkəzi konfiqurasiyası.
// Hamısını söndürmək üçün: enabled = false
export const winterEffects = {
  enabled: true,
  snowfall: {
    enabled: true,
    // Hissəciklərin sayı (viewport enindən asılı olaraq)
    desktopCount: 45,
    mobileCount: 20,
    mobileBreakpoint: 768,
  },
  santaHat: { enabled: true }, // logo üzərində kiçik Santa papağı
  accents: { enabled: true }, // Hero-da zərif isti işıq təbəqəsi
  // papaq yalnız bu kartlarda; partners:true olsa bütün partnyor evlərdə də görünər
  cardHats: {
    enabled: false,
    slugs: ["area36-royal-chalet", "area36-golden-loft", "qafqaz-riverside-chalet", "qafqaz-rolling-bungalow"],
    partners: false,
  },
  fairyLights: { enabled: false }, // Header-in alt kənarında incə isti ağ işıqlar
  frost: { enabled: true }, // Rezervasiya panelinin çərçivəsində zəif buz teksturası
  heroBranch: { enabled: false }, // Hero küncündə şam budağı
  footerBranch: { enabled: true }, // Footer küncündə şam budağı
};

export const isWinter = (key) =>
  winterEffects.enabled && (!key || winterEffects[key]?.enabled);
