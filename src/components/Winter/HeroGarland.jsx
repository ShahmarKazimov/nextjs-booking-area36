import Image from "next/image";
import { isWinter } from "@/config/winterEffects";

// Hero-nun yuxarı künclərində asılan şam budaqları (şəkil tünd fonludur -> `mix-blend-mode: lighten`
// ilə fon yox olur, yalnız budaq, işıq və giləmeyvələr qalır). Sağ künc eyni şəklin güzgü əksidir.
// Header-in altından asılır ki, logo və düymələrlə toqquşmasın. Valideyn Hero section olmalıdır.
const mask = "linear-gradient(to right, #000 55%, transparent 100%)";
const maskV = "linear-gradient(to bottom, transparent 0%, #000 22%, #000 62%, transparent 100%)";

function Corner({ side }) {
  const right = side === "right";
  return (
    <div
      className={`pointer-events-none absolute top-[128px] sm:top-[66px] h-[64px] w-[84px] sm:h-[120px] sm:w-[170px] overflow-hidden ${right ? "right-0 -scale-x-100" : "left-0"}`}
      style={{
        mixBlendMode: "lighten",
        WebkitMaskImage: `${mask}, ${maskV}`,
        maskImage: `${mask}, ${maskV}`,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <Image
        src="/images/ui/hero-pine-sparklers.png"
        alt=""
        width={560}
        height={374}
        sizes="280px"
        quality={70}
        className="max-w-none"
        style={{ width: "200%", height: "auto" }}
      />
    </div>
  );
}

export default function HeroGarland() {
  if (!isWinter("heroBranch")) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <Corner side="left" />
      <Corner side="right" />
    </div>
  );
}
