import { Link } from "@/i18n/routing";
import StickyHeader from "./StickyHeader/StickyHeader";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Header() {
    const t = useTranslations("Header");

    return (
        <>
            <header
                className="relative w-full bg-transparent text-white transition-all duration-300 ease-in-out z-50"
                role="banner"
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto py-2 px-4 xl:px-0 min-h-[81px]">
                    <div className="flex items-center group">
                        <Link
                            href="/"
                            aria-label="Area36 - Luxury Chalets & Villas"
                            title="Area36"
                            className="flex items-center group gap-x-2"
                        >
                            <figure>
                                {/* SVG logo üçün next/image lazım deyil — img tagi daha performanslıdır */}
                                <img
                                    src="/images/ui/logo.svg"
                                    alt="Area36 Logo"
                                    width={120}
                                    height={60}
                                    className="object-contain"
                                />
                                <figcaption className="sr-only">Area36 Brand Logo</figcaption>
                            </figure>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        <Link
                            href="https://wa.me/994552904045?text=Hi, I'm interested in renting a place. Can you assist me with the options?"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("contactWhatsapp")}
                        >
                            <button className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold hover:text-white/75 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md uppercase text-white transition-all">
                                {t("contact")}
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <StickyHeader />
        </>
    );
}