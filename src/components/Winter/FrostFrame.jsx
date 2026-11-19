import Image from "next/image";
import { isWinter } from "@/config/winterEffects";

// Rezervasiya panelinin kənarlarında çox zəif buzlanma teksturası.
// Şəkil qara fonda ağ kristallardır -> invert + multiply ilə ağ fonda yumşaq boz-mavi naxışa çevrilir.
// Valideyn `relative isolate` olmalıdır; dekor məzmunun arxasında qalır və klikləri bloklamır.
export default function FrostFrame() {
  if (!isWinter("frost")) return null;
  const { opacity } = { opacity: 0.12 };
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:rounded-3xl"
      style={{ mixBlendMode: "multiply", opacity }}
    >
      <Image
        src="/images/ui/frost-frame.png"
        alt=""
        fill
        sizes="440px"
        quality={60}
        className="object-fill"
        style={{ filter: "invert(1) sepia(.35) hue-rotate(170deg) saturate(1.4)" }}
      />
    </div>
  );
}
