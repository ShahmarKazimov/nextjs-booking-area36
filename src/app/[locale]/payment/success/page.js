import { pick } from "@/lib/seo";
import { Link } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: { az: "Ödəniş uğurlu oldu", ru: "Платёж выполнен" }[locale] || "Payment successful",
    robots: { index: false, follow: false },
  };
}

export default async function PaymentSuccess({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-green-600">{pick(locale, { en: "Payment completed successfully!", az: "Ödəniş uğurla tamamlandı!", ru: "Платёж успешно завершён!" })}</h1>
      <p className="text-gray-500">{pick(locale, { en: "We will contact you shortly.", az: "Tezliklə sizinlə əlaqə saxlayacağıq.", ru: "Мы скоро свяжемся с вами." })}</p>
      <Link href="/" className="mt-2 px-6 py-2.5 rounded-xl bg-[#2d4a2b] border border-[#2d4a2b] text-white hover:bg-[#233a22] hover:border-[#233a22] text-sm font-semibold transition-colors">{pick(locale, { en: "Back to home", az: "Ana səhifəyə qayıt", ru: "На главную" })}</Link>
    </div>
  );
}
