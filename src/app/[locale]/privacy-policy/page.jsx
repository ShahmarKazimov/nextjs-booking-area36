export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return {
    title: isAz ? "Məxfilik Siyasəti | Area36" : "Privacy Policy | Area36",
    description: isAz
      ? "AREA36 istifadəçilərinin şəxsi məlumatlarının qorunmasına xüsusi önəm verir. Bu Məxfilik Siyasəti saytımızdan istifadə zamanı məlumatların necə qorunduğunu izah edir."
      : "AREA36 attaches special importance to the protection of users' personal data. This Privacy Policy explains how information is protected when using our site.",
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {isAz ? "Məxfilik Siyasəti" : "Privacy Policy"}
          </h1>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>
            {isAz
              ? "AREA36 istifadəçilərinin şəxsi məlumatlarının qorunmasına xüsusi önəm verir. Bu Məxfilik Siyasəti saytımızdan istifadə zamanı hansı məlumatların toplandığını, necə istifadə edildiyini və necə qorunduğunu izah edir."
              : "AREA36 attaches special importance to the protection of users' personal data. This Privacy Policy explains what information is collected, how it is used, and how it is protected when using our site."}
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "1. Toplanan məlumatlar" : "1. Information collected"}</h2>
            <p>{isAz ? "Saytımız vasitəsilə rezervasiya sorğusu göndərərkən və ya bizimlə əlaqə saxlayarkən aşağıdakı məlumatlar toplana bilər:" : "The following information may be collected when sending a reservation request through our site or contacting us:"}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isAz ? "Ad və soyad" : "First and last name"}</li>
              <li>{isAz ? "Telefon nömrəsi" : "Phone number"}</li>
              <li>{isAz ? "Elektron poçt ünvanı" : "Email address"}</li>
              <li>{isAz ? "Rezervasiya tarixləri və seçilmiş obyekt haqqında məlumatlar" : "Reservation dates and information about the selected property"}</li>
              <li>{isAz ? "İstifadəçinin könüllü şəkildə təqdim etdiyi digər məlumatlar" : "Other information provided voluntarily by the user"}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "2. Məlumatlardan istifadə məqsədi" : "2. Purpose of using information"}</h2>
            <p>{isAz ? "Toplanmış məlumatlar aşağıdakı məqsədlərlə istifadə edilir:" : "Collected information is used for the following purposes:"}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isAz ? "Rezervasiya sorğularının emalı" : "Processing reservation requests"}</li>
              <li>{isAz ? "Müştərilərlə əlaqənin qurulması" : "Establishing communication with customers"}</li>
              <li>{isAz ? "Xidmətlərin təqdim olunması və təkmilləşdirilməsi" : "Providing and improving services"}</li>
              <li>{isAz ? "Sorğu və müraciətlərə cavab verilməsi" : "Responding to inquiries and requests"}</li>
              <li>{isAz ? "Hüquqi öhdəliklərin yerinə yetirilməsi" : "Fulfilling legal obligations"}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "3. Ödəniş məlumatları" : "3. Payment information"}</h2>
            <p>{isAz ? "AREA36 ödəniş əməliyyatlarını tərəfdaş ödəniş sistemləri vasitəsilə həyata keçirir." : "AREA36 carries out payment transactions through partner payment systems."}</p>
            <p>{isAz ? "Kart məlumatları birbaşa ödəniş provayderi tərəfindən emal olunur və AREA36 tərəfindən saxlanılmır, emal edilmir və ya üçüncü şəxslərə ötürülmür." : "Card details are processed directly by the payment provider and are not stored, processed, or transferred to third parties by AREA36."}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "4. Məlumatların paylaşılması" : "4. Sharing of information"}</h2>
            <p>{isAz ? "İstifadəçilərin şəxsi məlumatları aşağıdakı hallar istisna olmaqla üçüncü şəxslərlə paylaşılmır:" : "Users' personal information is not shared with third parties except in the following cases:"}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isAz ? "Xidmətin göstərilməsi üçün zəruri olduqda" : "When necessary for the provision of the service"}</li>
              <li>{isAz ? "Qanunvericiliyin tələbi ilə" : "At the request of legislation"}</li>
              <li>{isAz ? "İstifadəçinin razılığı olduqda" : "With the user's consent"}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "5. Məlumatların qorunması" : "5. Protection of information"}</h2>
            <p>{isAz ? "AREA36 istifadəçi məlumatlarının təhlükəsizliyini təmin etmək üçün müvafiq texniki və təşkilati tədbirlər həyata keçirir. Bununla belə, internet üzərindən məlumat ötürülməsi zamanı tam təhlükəsizliyə zəmanət verilə bilməz." : "AREA36 takes appropriate technical and organizational measures to ensure the security of user data. However, complete security cannot be guaranteed when transmitting information over the internet."}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "6. Cookie faylları" : "6. Cookies"}</h2>
            <p>{isAz ? "Saytın funksionallığını və istifadəçi təcrübəsini yaxşılaşdırmaq məqsədilə cookie və oxşar texnologiyalardan istifadə oluna bilər." : "Cookies and similar technologies may be used to improve site functionality and user experience."}</p>
            <p>{isAz ? "İstifadəçi brauzer ayarları vasitəsilə cookie-lərin istifadəsini məhdudlaşdıra və ya deaktiv edə bilər." : "The user can restrict or disable the use of cookies through browser settings."}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{isAz ? "7. İstifadəçi hüquqları" : "7. User rights"}</h2>
            <p>{isAz ? "İstifadəçilər öz şəxsi məlumatları ilə bağlı aşağıdakı hüquqlara malikdirlər:" : "Users have the following rights regarding their personal information:"}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isAz ? "Məlumatların hansı məqsədlə istifadə olunduğunu öyrənmək" : "To know for what purpose the information is used"}</li>
              <li>{isAz ? "Məlumatların yenilənməsini tələb etmək" : "To request updating of information"}</li>
              <li>{isAz ? "Məlumatların silinməsini tələb etmək" : "To request deletion of information"}</li>
              <li>{isAz ? "Məlumatların emalına etiraz etmək" : "To object to the processing of information"}</li>
            </ul>
            <p>{isAz ? "Bu hüquqlardan istifadə etmək üçün aşağıdakı əlaqə vasitələri ilə bizimlə əlaqə saxlaya bilərsiniz." : "You can contact us using the contact details below to exercise these rights."}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 mt-12 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {isAz ? "8. Əlaqə" : "8. Contact"}
            </h2>
            <div className="space-y-4 text-base">
              <p className="flex items-center">
                <span className="font-medium w-24 text-gray-900">{isAz ? "Telefon:" : "Phone:"}</span>
                <a href="tel:+994552904045" className="text-blue-600 hover:text-blue-800 transition-colors">
                  +994 55 290 40 45
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24 text-gray-900">{isAz ? "E-poçt:" : "Email:"}</span>
                <a href="mailto:gabaladeluxe@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                  gabaladeluxe@gmail.com
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24 text-gray-900">{isAz ? "Ünvan:" : "Address:"}</span>
                <span>{isAz ? "Qəbələ, Azərbaycan" : "Gabala, Azerbaijan"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
