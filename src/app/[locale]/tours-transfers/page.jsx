import { Car, MapPin, Check, MessageCircle, Lightbulb, Clock } from "lucide-react";
import Image from "next/image";
import { buildAlternates, localizedUrl, ogLocale, OG_IMAGE } from "@/lib/seo";

const PATH = "/tours-transfers";
const WA_NUMBER = "994552904045";

// Vehicle icons (SVG supplied by the team), drawn on a 48x48 grid
const svgProps = (size) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48",
  width: size,
  height: size,
  fill: "none",
  stroke: "#34492e",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

// Sedan keeps the original Lucide car icon
function SedanIcon() {
  return <Car size={34} strokeWidth={1} aria-hidden="true" />;
}

function VitoIcon({ size = 32 }) {
  return (
    <svg {...svgProps(size)}>
      <path d="M39.5 31H44V24.5Q44 21.6 41.6 20.6L36.6 13.8Q35.4 12 33 12H7.5Q4 12 4 15.5V31H8.5M17.5 31H30.5" />
      <path d="M7.5 15.5H15V21.5H7.5ZM18 15.5H25.5V21.5H18ZM28.5 15.5H34.2L38.6 21.5H28.5Z" strokeWidth="1.5" />
      <path d="M27 15.5V28" strokeWidth="1.5" />
      <path d="M41.5 24H43.2" stroke="#b8864b" />
      <circle cx="13" cy="32" r="3.5" />
      <circle cx="35" cy="32" r="3.5" />
      <circle cx="13" cy="32" r="1.2" fill="#b8864b" stroke="none" />
      <circle cx="35" cy="32" r="1.2" fill="#b8864b" stroke="none" />
    </svg>
  );
}

function SprinterIcon({ size = 32 }) {
  return (
    <svg {...svgProps(size)}>
      <path d="M40.5 31H45V25Q45 22.6 43 21.6L40.2 19.5L37.8 9.6Q37.2 7 34.5 7H6.5Q3 7 3 10.5V31H6.5M15.5 31H31.5" />
      <path d="M6.5 11H11.5V18H6.5ZM14.5 11H19.5V18H14.5ZM22.5 11H27.5V18H22.5ZM30.5 11H35L36.6 18H30.5Z" strokeWidth="1.5" />
      <path d="M29 11V28" strokeWidth="1.5" />
      <path d="M3 23H29" stroke="#b8864b" strokeWidth="1.5" />
      <path d="M42.3 24.5H44" stroke="#b8864b" />
      <circle cx="11" cy="32" r="3.5" />
      <circle cx="36" cy="32" r="3.5" />
      <circle cx="11" cy="32" r="1.2" fill="#b8864b" stroke="none" />
      <circle cx="36" cy="32" r="1.2" fill="#b8864b" stroke="none" />
    </svg>
  );
}

const VEHICLES = [
  { key: "sedan", name: "Sedan", Icon: SedanIcon, min: 1, max: 4, transfer: 160, pickup: 20, night: 75, shaki: 50 },
  { key: "vito", name: "Mercedes Vito", Icon: VitoIcon, min: 1, max: 7, transfer: 210, pickup: 30, night: 85, shaki: 85 },
  { key: "sprinter", name: "Mercedes Sprinter", Icon: SprinterIcon, min: 1, max: 18, transfer: 360, pickup: 50, night: 145, shaki: 100 },
];

const T = {
  az: {
    metaTitle: "Tur və Transfer | Bakı ↔ Qəbələ | Area36",
    metaDesc:
      "Bakı–Qəbələ transfer, hava limanı və dəmir yolu stansiyasından qarşılama, şəxsi sürücü və əlavə turlar. Sabit qiymətlər, əlavə ödəniş yoxdur.",
    heroAlt: "Qəbələ dağları fonunda Sedan, Mercedes Vito və Mercedes Sprinter nəqliyyat vasitələri",
    title: "Tur və Transfer",
    lead: "Qəbələyə səyahətinizi rahat edin: sizi qarşılayırıq, evə çatdırırıq, istəsəniz bütün qalış müddətində sürücü sizinlə olur.",
    cta: "WhatsApp-dan sifariş et",
    waText: "Salam, Area36 tur və transfer xidməti barədə məlumat almaq istəyirəm.",
    guests: (a, b) => `${a}–${b} nəfər`,
    s1: { tag: "1", title: "Transfer: Bakı ↔ Qəbələ", text: "Sürücü sizi çatdırıb geri qayıdır. Qiymət bir istiqamət üçündür.", unit: "bir istiqamət" },
    s2: { tag: "2", title: "Hava limanı və dəmir yolu stansiyasından qarşılama", text: "Qəbələ hava limanı və dəmir yolu stansiyasından sizi qarşılayıb evə çatdırırıq.", unit: "qarşılama" },
    s3: {
      tag: "3",
      title: "Şəxsi sürücü",
      text: "Sürücü sizi Bakıdan gətirir, qaldığınız müddətdə evinizin yaxınlığında qalır və istədiyiniz vaxt xidmətinizdədir: turlar, restoran, market və s. Qayıdış daxildir.",
      night: "gecə",
      tip: "1–2 gecə qalırsınızsa, şəxsi sürücü iki ayrı transferdən daha sərfəlidir.",
    },
    s4: { tag: "4", title: "Əlavə turlar", text: "Şəxsi sürücü paketinə əlavə.", place: "Şəki" },
    incTitle: "Qiymətə daxildir",
    inc: ["Yanacaq və yol xərcləri", "Sürücünün qidalanması və gecələməsi", "Uşaq oturacağı (pulsuz)", "Gecikmə halında pulsuz gözləmə"],
    incNote: "Əlavə ödəniş yoxdur.",
    howTitle: "Necə işləyir",
    how: [
      "WhatsApp-dan sifariş edirsiniz.",
      "Sürücü səfərdən əvvəl sizinlə əlaqə saxlayır.",
      "Sizi vaxtında qarşılayır, qatar və ya təyyarə gecikərsə, pulsuz gözləyir.",
    ],
    langs: "Sürücülər Azərbaycan və ingilis dillərində danışır.",
  },
  ru: {
    metaTitle: "Туры и трансферы | Баку ↔ Габала | Area36",
    metaDesc:
      "Трансфер Баку–Габала, встреча в аэропорту и на ж/д вокзале Габалы, личный водитель на время отдыха и дополнительные туры. Фиксированные цены, без доплат.",
    heroAlt: "Седан, Mercedes Vito и Mercedes Sprinter на фоне гор Габалы",
    title: "Туры и трансферы",
    lead: "Сделайте поездку в Габалу удобной: мы встретим вас, довезём до дома, а по желанию водитель будет с вами всё время отдыха.",
    cta: "Заказать в WhatsApp",
    waText: "Здравствуйте, хочу узнать об услугах туров и трансферов Area36.",
    guests: (a, b) => `${a}–${b} чел.`,
    s1: { tag: "1", title: "Трансфер: Баку ↔ Габала", text: "Водитель довозит вас и возвращается обратно. Цена указана за одно направление.", unit: "в одну сторону" },
    s2: { tag: "2", title: "Встреча в аэропорту и на ж/д вокзале Габалы", text: "Мы встретим вас в аэропорту или на ж/д вокзале Габалы и отвезём домой.", unit: "встреча" },
    s3: {
      tag: "3",
      title: "Личный водитель",
      text: "Водитель привозит вас из Баку, на время отдыха остаётся рядом с вашим домом и в любой момент в вашем распоряжении: туры, рестораны, магазины и не только. Обратная дорога включена.",
      night: "ночь",
      tip: "Если вы остаётесь на 1–2 ночи, личный водитель обойдётся дешевле двух отдельных трансферов.",
    },
    s4: { tag: "4", title: "Дополнительные туры", text: "Добавляются к пакету с личным водителем.", place: "Шеки" },
    incTitle: "Входит в стоимость",
    inc: ["Топливо и дорожные расходы", "Питание и ночлег водителя", "Детское кресло (бесплатно)", "Бесплатное ожидание при задержке"],
    incNote: "Без дополнительных платежей.",
    howTitle: "Как это работает",
    how: [
      "Вы оформляете заказ в WhatsApp.",
      "Водитель связывается с вами перед поездкой.",
      "Встречает вас вовремя и бесплатно ждёт, если поезд или самолёт задерживается.",
    ],
    langs: "Водители говорят на азербайджанском и английском языках.",
  },
  en: {
    metaTitle: "Tours & Transfers | Baku ↔ Gabala | Area36",
    metaDesc:
      "Baku–Gabala transfers, airport and train station pickup in Gabala, a private driver for your stay and extra tours. Fixed prices, no extra charges.",
    heroAlt: "Sedan, Mercedes Vito and Mercedes Sprinter vehicles against the Gabala mountains",
    title: "Tours & Transfers",
    lead: "Make your trip to Gabala easy: we meet you, take you to your home, and if you wish, a driver stays with you for your whole stay.",
    cta: "Order on WhatsApp",
    waText: "Hello, I would like information about the Area36 tours and transfer service.",
    guests: (a, b) => `${a}–${b} guests`,
    s1: { tag: "1", title: "Transfer: Baku ↔ Gabala", text: "The driver takes you there and drives back. Prices are per one direction.", unit: "one way" },
    s2: { tag: "2", title: "Pickup from Gabala airport and train station", text: "We meet you at Gabala airport or train station and take you to your home.", unit: "pickup" },
    s3: {
      tag: "3",
      title: "Private driver",
      text: "The driver brings you from Baku, stays near your home during your stay and is at your service whenever you need: tours, restaurants, shopping and more. The return trip is included.",
      night: "night",
      tip: "If you stay 1–2 nights, a private driver costs less than two separate transfers.",
    },
    s4: { tag: "4", title: "Extra tours", text: "Added to the private driver package.", place: "Sheki" },
    incTitle: "Included in the price",
    inc: ["Fuel and road costs", "Driver's meals and accommodation", "Child seat (free)", "Free waiting if you are delayed"],
    incNote: "No extra charges.",
    howTitle: "How it works",
    how: [
      "You order on WhatsApp.",
      "The driver contacts you before the trip.",
      "They meet you on time, and wait for free if your train or flight is delayed.",
    ],
    langs: "Drivers speak Azerbaijani and English.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = T[locale] || T.en;
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildAlternates(locale, PATH),
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc, images: [OG_IMAGE.url] },
    openGraph: {
      type: "website",
      siteName: "Area36",
      title: t.metaTitle,
      description: t.metaDesc,
      url: localizedUrl(locale, PATH),
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
  };
}

function SectionHead({ tag, title, text }) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2d4a2b] text-sm font-bold text-[#ebe7d8]">{tag}</span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {text && <p className="mt-2 max-w-3xl leading-relaxed text-gray-600">{text}</p>}
    </header>
  );
}

function Price({ value }) {
  return (
    <span className="text-3xl font-bold tracking-tight text-gray-900">
      {value} <span className="text-xl">₼</span>
    </span>
  );
}

const card =
  "flex flex-col max-sm:flex-row max-sm:items-center max-sm:justify-between max-sm:gap-3 rounded-2xl border border-[#e0dcd4] bg-white p-5 max-sm:p-4 shadow-sm transition-shadow hover:shadow-md";
const iconBox =
  "grid h-11 w-11 place-items-center rounded-xl border border-[#e0dcd4] bg-[#f5f0e6] text-[#2d4a2b]";

function VehicleHead({ v, t }) {
  return (
    <div className="mb-4 max-sm:mb-0 flex items-center gap-3">
      <span className={iconBox}>
        <v.Icon size={34} />
      </span>
      <div>
        <h3 className="font-bold leading-tight text-gray-900">{v.name}</h3>
        <p className="text-xs text-gray-500">{t.guests(v.min, v.max)}</p>
      </div>
    </div>
  );
}

export default async function ToursTransfersPage({ params }) {
  const { locale } = await params;
  const t = T[locale] || T.en;
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waText)}`;

  const Cta = ({ light = false }) => (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors sm:text-base ${
        light ? "bg-[#ebe7d8] text-[#1c1a17] hover:bg-white" : "bg-[#2d4a2b] text-white hover:bg-[#233a22]"
      }`}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {t.cta}
    </a>
  );

  return (
    <div>
      {/* Hero band */}
      <section className="relative isolate overflow-hidden bg-[#1c1a17] text-[#ebe7d8]">
        <Image
          src="/images/ui/tours-transfers-hero.webp"
          alt={t.heroAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[50%_70%] sm:object-[50%_85%]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:py-20 xl:px-0">
          <h1 className="text-3xl font-bold text-white sm:text-5xl [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white sm:text-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">{t.lead}</p>
          <div className="mt-8">
            <Cta light />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 pt-12 sm:space-y-16 xl:px-0">
        {/* 1. Transfer */}
        <section>
          <SectionHead tag={t.s1.tag} title={t.s1.title} text={t.s1.text} />
          <ul className="grid gap-4 sm:grid-cols-3">
            {VEHICLES.map((v) => (
              <li key={v.key} className={card}>
                <VehicleHead v={v} t={t} />
                <div className="mt-auto border-t border-gray-100 pt-4 max-sm:mt-0 max-sm:border-t-0 max-sm:pt-0 max-sm:text-right">
                  <Price value={v.transfer} />
                  <p className="text-xs text-gray-500">{t.s1.unit}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 2. Pickup */}
        <section>
          <SectionHead tag={t.s2.tag} title={t.s2.title} text={t.s2.text} />
          <ul className="grid gap-4 sm:grid-cols-3">
            {VEHICLES.map((v) => (
              <li key={v.key} className={card}>
                <VehicleHead v={v} t={t} />
                <div className="mt-auto border-t border-gray-100 pt-4 max-sm:mt-0 max-sm:border-t-0 max-sm:pt-0 max-sm:text-right">
                  <Price value={v.pickup} />
                  <p className="text-xs text-gray-500">{t.s2.unit}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Private driver */}
        <section>
          <SectionHead tag={t.s3.tag} title={t.s3.title} text={t.s3.text} />
          <ul className="grid gap-4 sm:grid-cols-3">
            {VEHICLES.map((v) => (
              <li key={v.key} className={card}>
                <VehicleHead v={v} t={t} />
                <div className="mt-auto space-y-1 border-t border-gray-100 pt-4 max-sm:mt-0 max-sm:border-t-0 max-sm:pt-0 max-sm:text-right">
                  <Price value={v.transfer} />
                  <p className="text-sm font-semibold text-[#2d4a2b]">
                    + {v.night} ₼ <span className="font-normal text-gray-500">/ {t.s3.night}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-3 rounded-xl border border-[#d8c58f]/60 bg-[#f1e9d2] p-4 text-sm text-gray-800 sm:text-base">
            <Lightbulb size={20} className="mt-0.5 shrink-0 text-[#8a6d1d]" aria-hidden="true" />
            <span>{t.s3.tip}</span>
          </p>
        </section>

        {/* 4. Extra tours */}
        <section>
          <SectionHead tag={t.s4.tag} title={t.s4.title} text={t.s4.text} />
          <div className="rounded-2xl border border-[#e0dcd4] bg-white p-5 shadow-sm">
            <div className="mb-4 max-sm:mb-0 flex items-center gap-3">
              <span className={iconBox}>
                <MapPin size={22} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-gray-900">{t.s4.place}</h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {VEHICLES.map((v) => (
                <li key={v.key} className="flex items-center justify-between rounded-xl bg-[#f5f0e6] px-4 py-3">
                  <span className="font-medium text-gray-800">{v.name}</span>
                  <span className="font-bold text-[#2d4a2b]">+{v.shaki} ₼</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Included + how it works */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-[#1c1a17] p-6 text-[#ebe7d8] sm:p-8">
            <h2 className="text-xl font-bold text-white sm:text-2xl">{t.incTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.inc.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#d8c58f] text-[#1c1a17]">
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 font-semibold text-[#d8c58f]">{t.incNote}</p>
          </section>

          <section className="rounded-2xl border border-[#e0dcd4] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{t.howTitle}</h2>
            <ol className="mt-5 space-y-4">
              {t.how.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2d4a2b] text-sm font-bold text-[#ebe7d8]">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
              <Clock size={16} className="text-[#2d4a2b]" aria-hidden="true" />
              {t.langs}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
