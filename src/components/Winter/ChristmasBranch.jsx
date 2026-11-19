import { isWinter } from "@/config/winterEffects";

// Şam budağı: ağacdan asılan diaqonal budaq, isti-ağ işıqlar və 3 bəzək.
// Koordinatlar deterministikdir (Math.random yoxdur) -> SSR/hydration uyğunsuzluğu olmur.
const N = 16;
const pts = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);
  return { t, x: 214 - 196 * t, y: 3 + 46 * Math.pow(t, 1.35) };
});

const needles = pts.flatMap((p, i) => {
  const len = 16 - p.t * 6;
  const dark = i % 2 === 0;
  return [
    { x1: p.x, y1: p.y, x2: p.x - len * 0.55, y2: p.y + len, c: dark ? "#1f4a35" : "#2c6446" },
    { x1: p.x, y1: p.y, x2: p.x + len * 0.15, y2: p.y + len * 0.95, c: dark ? "#2c6446" : "#1f4a35" },
    { x1: p.x, y1: p.y, x2: p.x - len * 0.95, y2: p.y + len * 0.45, c: "#1a3f2d" },
  ];
});

const lights = [2, 5, 8, 11, 14].map((i, k) => ({
  x: pts[i].x - 4,
  y: pts[i].y + 11,
  d: `${(k * 0.7).toFixed(1)}s`,
}));
const ornaments = [
  { i: 4, c: "#9b2335" },
  { i: 9, c: "#c9a45c" },
  { i: 13, c: "#9b2335" },
].map(({ i, c }) => ({ x: pts[i].x - 7, y: pts[i].y + 18, c }));

const POS = {
  // Hero: sol-alt künc, yuxarı-sağa uzanır (mətndən və başlıqdan uzaq)
  hero: "absolute bottom-3 left-0 z-[5] w-[170px] sm:w-[280px] -scale-100",
  // Footer: sağ-yuxarı künc, aşağı asılır
  footer: "absolute top-0 right-0 z-[1] w-[120px] sm:w-[210px]",
};

export default function ChristmasBranch({ variant = "hero" }) {
  const key = variant === "hero" ? "heroBranch" : "footerBranch";
  if (!isWinter(key)) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 220 80"
      className={`pointer-events-none select-none h-auto opacity-90 ${POS[variant]}`}
    >
      <path
        d={`M${pts[0].x} ${pts[0].y} ${pts.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")}`}
        stroke="#4a3322"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {needles.map((n, i) => (
        <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} stroke={n.c} strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {ornaments.map((o, i) => (
        <g key={i}>
          <rect x={o.x - 1.2} y={o.y - 6} width="2.4" height="2.4" fill="#c9a45c" />
          <circle cx={o.x} cy={o.y} r="3.6" fill={o.c} />
          <circle cx={o.x - 1.1} cy={o.y - 1.2} r="1" fill="#fff" opacity=".55" />
        </g>
      ))}
      {lights.map((l, i) => (
        <g key={i} className="xmas-light" style={{ animationDelay: l.d }}>
          <circle cx={l.x} cy={l.y} r="5" fill="#ffe9b8" opacity=".25" />
          <circle cx={l.x} cy={l.y} r="2.2" fill="#fff3d6" />
        </g>
      ))}
    </svg>
  );
}
