import { Link } from "@/i18n/routing";
import StickyHeader from "./StickyHeader/StickyHeader";
import LanguageSwitcher from "./LanguageSwitcher";
import WishlistLink from "../Wishlist/WishlistLink";
import HeaderNav from "./HeaderNav";
import MobileMenu from "./MobileMenu";
import SantaHat from "../Winter/SantaHat";
import FairyLights from "../Winter/FairyLights";

export default function Header() {
    return (
        <>
            <header
                className="relative w-full bg-transparent has-[#mobile-menu]:bg-[#1c1a17] text-white z-50"
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
                            <figure className="relative">
                                {/* SVG logo üçün next/image lazım deyil — img tagi daha performanslıdır */}
                                <img
                                    src="/images/ui/logo.svg"
                                    alt="Area36 Logo"
                                    width={120}
                                    height={60}
                                    className="object-contain w-[100px] sm:w-[120px] h-auto"
                                />
                                <SantaHat />
                                <figcaption className="sr-only">Area36 Brand Logo</figcaption>
                            </figure>
                        </Link>
                    </div>

                    <HeaderNav />

                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2">
                            <WishlistLink />
                            <LanguageSwitcher />
                        </div>
                        <MobileMenu />
                    </div>
                </div>
                <FairyLights />
            </header>

            <StickyHeader />
        </>
    );
}