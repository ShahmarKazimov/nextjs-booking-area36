import Link from "next/link";
import StickyHeader from "./StickyHeader/page";
import Image from "next/image";


export default function Header() {
    return (
        <>
            <header
                className="relative w-full bg-transparent text-white transition-all duration-300 ease-in-out z-50"
                role="banner"
            >
                <div className="flex items-center justify-between py-2 pl-[0.7rem] pr-[1.1rem] xl:px-10 min-h-[81px]">
                    <div className="flex items-center group">
                        <Link
                            href="/"
                            aria-label="Area36"
                            title="Area36"
                            className="flex items-center group gap-x-2"
                        >
                            <figure className="flex items-center flex-shrink-0">
                                <Image
                                    src="/images/ui/area-logo.svg"
                                    alt="Area36 Logo"
                                    width={65}
                                    height={65}
                                    priority    
                                    className="block"
                                />
                            </figure>
                            <figcaption className="sr-only">Area36 Brand Logo</figcaption>

                            <h1 className="text-[2rem] font-bold text-white whitespace-nowrap">
                                A<span className="font-normal">rea<span className="font-medium text-blue-500">36</span></span>
                            </h1>
                        </Link>
                    </div>
                    <Link
                        href="https://wa.me/994504271987?text=Hello, I would like to get more information about this house."
                        target="_blank"
                        rel="noopener noreferrer">
                        <button className="cursor-pointer w-full rounded-lg py-3.5 text-sm font-semibold hover:text-white/75 uppercase text-white transition-all">
                            Contact
                        </button>
                    </Link>
                </div>
            </header>

            <StickyHeader />
        </>
    );
}