import { buildAlternates, localizedUrl, ogLocale, OG_IMAGE, pick } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const title = pick(locale, { en: "Privacy Policy | Area36", az: "Məxfilik Siyasəti | Area36", ru: "Политика конфиденциальности | Area36" });
  const description = pick(locale, { en: "AREA36 attaches special importance to the protection of users' personal data. This Privacy Policy explains how information is protected when using our site.", az: "AREA36 istifadəçilərinin şəxsi məlumatlarının qorunmasına xüsusi önəm verir. Bu Məxfilik Siyasəti saytımızdan istifadə zamanı məlumatların necə qorunduğunu izah edir.", ru: "AREA36 уделяет особое внимание защите персональных данных пользователей. Эта Политика конфиденциальности объясняет, как защищается информация при использовании нашего сайта." });

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, "/privacy-policy"),
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    openGraph: {
      type: "website",
      siteName: "Area36",
      title,
      description,
      url: localizedUrl(locale, "/privacy-policy"),
      locale: ogLocale(locale),
      images: [OG_IMAGE],
    },
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return (
    <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1c1a17] px-8 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {pick(locale, { en: "Privacy Policy", az: "Məxfilik Siyasəti", ru: "Политика конфиденциальности" })}
          </h1>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>
            {pick(locale, { en: "AREA36 attaches special importance to the protection of users' personal data. This Privacy Policy explains what information is collected, how it is used, and how it is protected when using our site.", az: "AREA36 istifadəçilərinin şəxsi məlumatlarının qorunmasına xüsusi önəm verir. Bu Məxfilik Siyasəti saytımızdan istifadə zamanı hansı məlumatların toplandığını, necə istifadə edildiyini və necə qorunduğunu izah edir.", ru: "AREA36 уделяет особое внимание защите персональных данных пользователей. Эта Политика конфиденциальности объясняет, какая информация собирается при использовании нашего сайта, как она используется и как защищается." })}
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "1. Information collected", az: "1. Toplanan məlumatlar", ru: "1. Собираемая информация" })}</h2>
            <p>{pick(locale, { en: "The following information may be collected when sending a reservation request through our site or contacting us:", az: "Saytımız vasitəsilə rezervasiya sorğusu göndərərkən və ya bizimlə əlaqə saxlayarkən aşağıdakı məlumatlar toplana bilər:", ru: "При отправке запроса на бронирование через наш сайт или при обращении к нам может собираться следующая информация:" })}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{pick(locale, { en: "First and last name", az: "Ad və soyad", ru: "Имя и фамилия" })}</li>
              <li>{pick(locale, { en: "Phone number", az: "Telefon nömrəsi", ru: "Номер телефона" })}</li>
              <li>{pick(locale, { en: "Email address", az: "Elektron poçt ünvanı", ru: "Адрес электронной почты" })}</li>
              <li>{pick(locale, { en: "Reservation dates and information about the selected property", az: "Rezervasiya tarixləri və seçilmiş obyekt haqqında məlumatlar", ru: "Даты бронирования и сведения о выбранном объекте" })}</li>
              <li>{pick(locale, { en: "Other information provided voluntarily by the user", az: "İstifadəçinin könüllü şəkildə təqdim etdiyi digər məlumatlar", ru: "Другая информация, добровольно предоставленная пользователем" })}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "2. Purpose of using information", az: "2. Məlumatlardan istifadə məqsədi", ru: "2. Цели использования информации" })}</h2>
            <p>{pick(locale, { en: "Collected information is used for the following purposes:", az: "Toplanmış məlumatlar aşağıdakı məqsədlərlə istifadə edilir:", ru: "Собранная информация используется в следующих целях:" })}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{pick(locale, { en: "Processing reservation requests", az: "Rezervasiya sorğularının emalı", ru: "Обработка запросов на бронирование" })}</li>
              <li>{pick(locale, { en: "Establishing communication with customers", az: "Müştərilərlə əlaqənin qurulması", ru: "Связь с клиентами" })}</li>
              <li>{pick(locale, { en: "Providing and improving services", az: "Xidmətlərin təqdim olunması və təkmilləşdirilməsi", ru: "Предоставление и улучшение услуг" })}</li>
              <li>{pick(locale, { en: "Responding to inquiries and requests", az: "Sorğu və müraciətlərə cavab verilməsi", ru: "Ответы на вопросы и обращения" })}</li>
              <li>{pick(locale, { en: "Fulfilling legal obligations", az: "Hüquqi öhdəliklərin yerinə yetirilməsi", ru: "Выполнение требований законодательства" })}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "3. Payment information", az: "3. Ödəniş məlumatları", ru: "3. Платёжная информация" })}</h2>
            <p>{pick(locale, { en: "AREA36 carries out payment transactions through partner payment systems.", az: "AREA36 ödəniş əməliyyatlarını tərəfdaş ödəniş sistemləri vasitəsilə həyata keçirir.", ru: "AREA36 проводит платежи через партнёрские платёжные системы." })}</p>
            <p>{pick(locale, { en: "Card details are processed directly by the payment provider and are not stored, processed, or transferred to third parties by AREA36.", az: "Kart məlumatları birbaşa ödəniş provayderi tərəfindən emal olunur və AREA36 tərəfindən saxlanılmır, emal edilmir və ya üçüncü şəxslərə ötürülmür.", ru: "Данные карты обрабатываются напрямую платёжным провайдером и не хранятся, не обрабатываются и не передаются третьим лицам компанией AREA36." })}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "4. Sharing of information", az: "4. Məlumatların paylaşılması", ru: "4. Передача информации" })}</h2>
            <p>{pick(locale, { en: "Users' personal information is not shared with third parties except in the following cases:", az: "İstifadəçilərin şəxsi məlumatları aşağıdakı hallar istisna olmaqla üçüncü şəxslərlə paylaşılmır:", ru: "Персональные данные пользователей не передаются третьим лицам, кроме следующих случаев:" })}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{pick(locale, { en: "When necessary for the provision of the service", az: "Xidmətin göstərilməsi üçün zəruri olduqda", ru: "Когда это необходимо для оказания услуги" })}</li>
              <li>{pick(locale, { en: "At the request of legislation", az: "Qanunvericiliyin tələbi ilə", ru: "По требованию законодательства" })}</li>
              <li>{pick(locale, { en: "With the user's consent", az: "İstifadəçinin razılığı olduqda", ru: "С согласия пользователя" })}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "5. Protection of information", az: "5. Məlumatların qorunması", ru: "5. Защита информации" })}</h2>
            <p>{pick(locale, { en: "AREA36 takes appropriate technical and organizational measures to ensure the security of user data. However, complete security cannot be guaranteed when transmitting information over the internet.", az: "AREA36 istifadəçi məlumatlarının təhlükəsizliyini təmin etmək üçün müvafiq texniki və təşkilati tədbirlər həyata keçirir. Bununla belə, internet üzərindən məlumat ötürülməsi zamanı tam təhlükəsizliyə zəmanət verilə bilməz.", ru: "AREA36 принимает необходимые технические и организационные меры для обеспечения безопасности данных пользователей. Однако при передаче информации через интернет полную безопасность гарантировать нельзя." })}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "6. Cookies", az: "6. Cookie faylları", ru: "6. Файлы cookie" })}</h2>
            <p>{pick(locale, { en: "Cookies and similar technologies may be used to improve site functionality and user experience.", az: "Saytın funksionallığını və istifadəçi təcrübəsini yaxşılaşdırmaq məqsədilə cookie və oxşar texnologiyalardan istifadə oluna bilər.", ru: "Файлы cookie и аналогичные технологии могут использоваться для улучшения работы сайта и удобства пользователей." })}</p>
            <p>{pick(locale, { en: "The user can restrict or disable the use of cookies through browser settings.", az: "İstifadəçi brauzer ayarları vasitəsilə cookie-lərin istifadəsini məhdudlaşdıra və ya deaktiv edə bilər.", ru: "Пользователь может ограничить или отключить использование cookie в настройках браузера." })}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{pick(locale, { en: "7. User rights", az: "7. İstifadəçi hüquqları", ru: "7. Права пользователей" })}</h2>
            <p>{pick(locale, { en: "Users have the following rights regarding their personal information:", az: "İstifadəçilər öz şəxsi məlumatları ilə bağlı aşağıdakı hüquqlara malikdirlər:", ru: "Пользователи имеют следующие права в отношении своих персональных данных:" })}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{pick(locale, { en: "To know for what purpose the information is used", az: "Məlumatların hansı məqsədlə istifadə olunduğunu öyrənmək", ru: "Узнавать, для каких целей используется информация" })}</li>
              <li>{pick(locale, { en: "To request updating of information", az: "Məlumatların yenilənməsini tələb etmək", ru: "Требовать обновления информации" })}</li>
              <li>{pick(locale, { en: "To request deletion of information", az: "Məlumatların silinməsini tələb etmək", ru: "Требовать удаления информации" })}</li>
              <li>{pick(locale, { en: "To object to the processing of information", az: "Məlumatların emalına etiraz etmək", ru: "Возражать против обработки информации" })}</li>
            </ul>
            <p>{pick(locale, { en: "You can contact us using the contact details below to exercise these rights.", az: "Bu hüquqlardan istifadə etmək üçün aşağıdakı əlaqə vasitələri ilə bizimlə əlaqə saxlaya bilərsiniz.", ru: "Чтобы воспользоваться этими правами, свяжитесь с нами по контактам ниже." })}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 mt-12 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {pick(locale, { en: "8. Contact", az: "8. Əlaqə", ru: "8. Контакты" })}
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
