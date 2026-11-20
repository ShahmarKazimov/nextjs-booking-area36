"use client";

import { useTranslations } from "next-intl";

const WA_URL =
    "https://wa.me/994552904045?text=Hi, I'm interested in renting a place. Can you assist me with the options?";

// Always-visible WhatsApp button, fixed to the bottom-right corner of the screen
export default function WhatsAppFloat() {
    const t = useTranslations("Header");

    return (
        <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("contactWhatsapp")}
            title={t("contactWhatsapp")}
            className="whatsapp-float fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#2d4a2b] hover:bg-[#233a22] text-[#ebe7d8] border border-[#ebe7d8]/20 shadow-lg shadow-black/30 transition-transform hover:scale-105 active:scale-95"
        >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />
            </svg>
        </a>
    );
}
