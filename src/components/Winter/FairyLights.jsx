import { isWinter } from "@/config/winterEffects";

// Klaster tipli incə işıq zənciri: əsas məftil + yuxarı/aşağı növbələşən qısa saplar, sonda damla lampalar.
// Bir "swag" (TILE px) pattern kimi təkrarlanır -> hər enə uyğunlaşır, lampalar deformasiya olunmur.
// Lampalar iki qrupa bölünür; qruplar fərqli fazada çox yavaş parıldayır.
// Valideyn `relative` olmalıdır; zəncir onun alt kənarından sallanır.
const TILE = 300;
const H = 40;
const Y0 = 7; // məftilin uc nöqtələrinin y-i
const SAG = 24; // Bezier nəzarət nöqtəsinin enməsi (ortada y = Y0 + SAG/2)
const COUNT = 10;

const wirePath = `M0 ${Y0}Q${TILE / 2} ${Y0 + SAG} ${TILE} ${Y0}`;

const f = (n) => n.toFixed(1);
const items = Array.from({ length: COUNT }, (_, i) => {
  const t = (i + 0.5) / COUNT;
  const x = TILE * t;
  return { i, t, x };
}).map((p) => {
  // Q Bezier: y(t) = Y0*(1-t)^2 + 2*(Y0+SAG)*t*(1-t) + Y0*t^2
  const y = Y0 * (1 - p.t) ** 2 + 2 * (Y0 + SAG) * p.t * (1 - p.t) + Y0 * p.t ** 2;
  const up = p.i % 2 === 0;
  const len = up ? 6 + (p.i % 3) * 1.5 : 9 + (p.i % 4) * 2;
  const bx = p.x + (up ? 0.8 : -0.8);
  const by = up ? y - len : y + len;
  return { ...p, y, bx, by, up };
});

const stems = items.map((s) => `M${f(s.x)} ${f(s.y)}L${f(s.bx)} ${f(s.by)}`).join("");

function Bulbs({ group }) {
  return items
    .filter((s) => s.i % 2 === group)
    .map((s) => (
      <g key={s.i} transform={`translate(${f(s.bx)} ${f(s.by)}) rotate(${s.up ? 180 : 0})`}>
        <circle cy={s.up ? -1 : 1} r="4.2" fill="#ffe2a8" opacity=".22" />
        <ellipse cy="1.2" rx="1.5" ry="2.3" fill="#fff3d6" />
      </g>
    ));
}

export default function FairyLights() {
  if (!isWinter("fairyLights")) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="100%"
      height={H}
      className="pointer-events-none absolute left-0 top-full z-[2] block w-full"
    >
      <defs>
        <pattern id="flBase" width={TILE} height={H} patternUnits="userSpaceOnUse">
          <path d={wirePath} fill="none" stroke="#9a8a74" strokeOpacity=".6" strokeWidth=".9" />
          <path d={stems} fill="none" stroke="#9a8a74" strokeOpacity=".55" strokeWidth=".6" />
        </pattern>
        <pattern id="flA" width={TILE} height={H} patternUnits="userSpaceOnUse">
          <Bulbs group={0} />
        </pattern>
        <pattern id="flB" width={TILE} height={H} patternUnits="userSpaceOnUse">
          <Bulbs group={1} />
        </pattern>
      </defs>
      <rect width="100%" height={H} fill="url(#flBase)" />
      <rect width="100%" height={H} fill="url(#flA)" className="xmas-glow" />
      <rect width="100%" height={H} fill="url(#flB)" className="xmas-glow" style={{ animationDelay: "2.7s" }} />
    </svg>
  );
}
