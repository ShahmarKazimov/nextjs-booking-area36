import Image from "next/image";
import { isWinter } from "@/config/winterEffects";

// Footer-in sağ tərəfində küknar budaqları + işıqlar; sol tərəfə doğru maska ilə sönür.
// Mobil: yüksək ayrılışlı kəsim (retina-da kəskin); masaüstü: əvvəlki şəkil.
// Valideyn (footer) `relative isolate` olmalıdır.
const mask = "linear-gradient(to right, transparent 0%, #000 55%)";

export default function FooterGarland() {
  if (!isWinter("footerBranch")) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[38%] sm:w-[38%] lg:w-[30%] overflow-hidden opacity-35 sm:opacity-90"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      {/* mobil */}
      <Image
        src="/images/ui/footer-spruce-hd.jpg"
        alt=""
        fill
        sizes="200vw"
        className="object-cover object-right sm:hidden"
        quality={85}
      />
      {/* masaüstü */}
      <Image
        src="/images/ui/footer-spruce-lights.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 40vw"
        className="hidden object-cover object-right sm:block"
        quality={70}
      />
      {/* mobil: üst və alt kənarlar footer fonuna yumşaq sönür */}
      <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#1c1a17]/65 via-[#1c1a17]/30 to-transparent sm:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#1c1a17]/65 via-[#1c1a17]/30 to-transparent sm:hidden" />
    </div>
  );
}
