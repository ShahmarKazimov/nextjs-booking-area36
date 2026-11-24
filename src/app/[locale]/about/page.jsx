import { buildAlternates, localizedUrl, ogLocale, OG_IMAGE, pick } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const title = pick(locale, { en: "About Area36 | Premium Villas", az: "Area36 Haqqında | Premium Villalar", ru: "О компании Area36 | Премиальные виллы" });
  const description = pick(locale, { en: "AREA36 is a platform operating in the presentation and reservation of premium villas and holiday homes in Azerbaijan.", az: "AREA36 Azərbaycanda premium villa və istirahət evlərinin təqdimatı və rezervasiyası sahəsində fəaliyyət göstərən platformadır.", ru: "AREA36 — платформа по представлению и бронированию премиальных вилл и домов для отдыха в Азербайджане." });

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    openGraph: {
      type: "website",
      siteName: "Area36",
      title,
      description,
      url: localizedUrl(locale, "/about"),
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1c1a17] px-8 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {pick(locale, { en: "About us", az: "Haqqımızda", ru: "О нас" })}
          </h1>
        </div>
        
        <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>
            {pick(locale, { en: "AREA36 is a platform operating in the presentation and reservation of premium villas and holiday homes in Azerbaijan.", az: "AREA36 Azərbaycanda premium villa və istirahət evlərinin təqdimatı və rezervasiyası sahəsində fəaliyyət göstərən platformadır.", ru: "AREA36 — платформа по представлению и бронированию премиальных вилл и домов для отдыха в Азербайджане." })}
          </p>
          
          <p>
            {pick(locale, { en: "Operating for more than two years, AREA36 aims to provide guests with a comfortable, safe, and high-quality holiday experience. During this period, more than 1000 guests have benefited from reservation services in various holiday destinations through our platform.", az: "İki ildən artıqdır ki, fəaliyyət göstərən AREA36 qonaqlara rahat, təhlükəsiz və keyfiyyətli istirahət təcrübəsi təqdim etməyi qarşısına məqsəd qoyub. Bu müddət ərzində platformamız vasitəsilə 1000-dən çox qonaq müxtəlif istirahət məkanlarında rezervasiya xidmətlərindən yararlanıb.", ru: "Работая более двух лет, AREA36 стремится дарить гостям комфортный, безопасный и качественный отдых. За это время более 1000 гостей воспользовались через нашу платформу услугами бронирования в разных местах отдыха." })}
          </p>

          <p>
            {pick(locale, { en: "Currently, more than 10 villas and holiday homes are presented through AREA36. Our platform includes both villas managed by us and selected properties belonging to our reliable partners. Each presented space is selected taking into account the comfort and satisfaction of the guests.", az: "Hazırda AREA36 üzərindən 10-dan çox villa və istirahət evi təqdim olunur. Platformamızda həm öz idarə etdiyimiz villalar, həm də etibarlı tərəfdaşlarımıza məxsus seçilmiş obyektlər yer alır. Təqdim olunan hər bir məkan qonaqların rahatlığı və məmnuniyyəti nəzərə alınaraq seçilir.", ru: "Сейчас через AREA36 представлено более 10 вилл и домов для отдыха. На платформе есть как виллы под нашим управлением, так и отобранные объекты наших надёжных партнёров. Каждое место выбирается с учётом комфорта и удовлетворённости гостей." })}
          </p>

          <p>
            {pick(locale, { en: "We believe that a quality holiday starts with the right choice. Therefore, we provide our users with detailed information about the villas and organize the reservation process as simply and transparently as possible.", az: "Biz inanırıq ki, keyfiyyətli istirahət düzgün seçimlə başlayır. Buna görə də istifadəçilərimizə villalar haqqında ətraflı məlumat təqdim edir, rezervasiya prosesini mümkün qədər sadə və şəffaf şəkildə təşkil edirik.", ru: "Мы верим, что хороший отдых начинается с правильного выбора. Поэтому мы даём подробную информацию о виллах и делаем процесс бронирования максимально простым и прозрачным." })}
          </p>

          <p>
            {pick(locale, { en: "Our mission is to create a reliable bridge between guests and quality holiday destinations, and to become one of the reliable and recognized platforms in the field of villa reservation in Azerbaijan.", az: "Missiyamız qonaqlar ilə keyfiyyətli istirahət məkanları arasında etibarlı körpü yaratmaq, Azərbaycanda villa rezervasiyası sahəsində etibarlı və tanınan platformalardan biri olmaqdır.", ru: "Наша миссия — стать надёжным мостом между гостями и качественными местами отдыха и войти в число надёжных и узнаваемых платформ по бронированию вилл в Азербайджане." })}
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {pick(locale, { en: "Why AREA36?", az: "Niyə AREA36?", ru: "Почему AREA36?" })}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>{pick(locale, { en: "Premium and carefully selected villas", az: "Premium və diqqətlə seçilmiş villalar", ru: "Премиальные, тщательно отобранные виллы" })}</li>
              <li>{pick(locale, { en: "Simple and convenient reservation process", az: "Sadə və rahat rezervasiya prosesi", ru: "Простое и удобное бронирование" })}</li>
              <li>{pick(locale, { en: "Prompt customer support", az: "Operativ müştəri dəstəyi", ru: "Быстрая поддержка гостей" })}</li>
              <li>{pick(locale, { en: "Secure payment and reservation options", az: "Təhlükəsiz ödəniş və rezervasiya imkanları", ru: "Безопасные способы оплаты и бронирования" })}</li>
              <li>{pick(locale, { en: "Service approach focused on guest satisfaction", az: "Qonaq məmnuniyyətinə yönəlmiş xidmət yanaşması", ru: "Сервис, ориентированный на удовлетворённость гостей" })}</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 mt-12 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {pick(locale, { en: "Contact", az: "Əlaqə", ru: "Контакты" })}
            </h2>
            <div className="space-y-4 text-base">
              <p className="flex items-center">
                <span className="font-medium w-24 text-gray-900">{pick(locale, { en: "Phone:", az: "Telefon:", ru: "Телефон:" })}</span>
                <a href="tel:+994552904045" className="text-gray-900 hover:text-black font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-colors">
                  +994 55 290 40 45
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24 text-gray-900">{pick(locale, { en: "Email:", az: "E-poçt:", ru: "Эл. почта:" })}</span>
                <a href="mailto:info@area36.az" className="text-gray-900 hover:text-black font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-colors">
                  info@area36.az
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24 text-gray-900">{pick(locale, { en: "Address:", az: "Ünvan:", ru: "Адрес:" })}</span>
                <span>{pick(locale, { en: "Gabala, Azerbaijan", az: "Qəbələ, Azərbaycan", ru: "Габала, Азербайджан" })}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
