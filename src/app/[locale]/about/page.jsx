export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return {
    title: isAz ? "Area36 Haqqında | Premium Villalar" : "About Area36 | Premium Villas",
    description: isAz 
      ? "AREA36 Azərbaycanda premium villa və istirahət evlərinin təqdimatı və rezervasiyası sahəsində fəaliyyət göstərən platformadır."
      : "AREA36 is a platform operating in the presentation and reservation of premium villas and holiday homes in Azerbaijan.",
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {isAz ? "Haqqımızda" : "About us"}
          </h1>
        </div>
        
        <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>
            {isAz 
              ? "AREA36 Azərbaycanda premium villa və istirahət evlərinin təqdimatı və rezervasiyası sahəsində fəaliyyət göstərən platformadır."
              : "AREA36 is a platform operating in the presentation and reservation of premium villas and holiday homes in Azerbaijan."}
          </p>
          
          <p>
            {isAz 
              ? "İki ildən artıqdır ki, fəaliyyət göstərən AREA36 qonaqlara rahat, təhlükəsiz və keyfiyyətli istirahət təcrübəsi təqdim etməyi qarşısına məqsəd qoyub. Bu müddət ərzində platformamız vasitəsilə 1000-dən çox qonaq müxtəlif istirahət məkanlarında rezervasiya xidmətlərindən yararlanıb."
              : "Operating for more than two years, AREA36 aims to provide guests with a comfortable, safe, and high-quality holiday experience. During this period, more than 1000 guests have benefited from reservation services in various holiday destinations through our platform."}
          </p>

          <p>
            {isAz 
              ? "Hazırda AREA36 üzərindən 10-dan çox villa və istirahət evi təqdim olunur. Platformamızda həm öz idarə etdiyimiz villalar, həm də etibarlı tərəfdaşlarımıza məxsus seçilmiş obyektlər yer alır. Təqdim olunan hər bir məkan qonaqların rahatlığı və məmnuniyyəti nəzərə alınaraq seçilir."
              : "Currently, more than 10 villas and holiday homes are presented through AREA36. Our platform includes both villas managed by us and selected properties belonging to our reliable partners. Each presented space is selected taking into account the comfort and satisfaction of the guests."}
          </p>

          <p>
            {isAz 
              ? "Biz inanırıq ki, keyfiyyətli istirahət düzgün seçimlə başlayır. Buna görə də istifadəçilərimizə villalar haqqında ətraflı məlumat təqdim edir, rezervasiya prosesini mümkün qədər sadə və şəffaf şəkildə təşkil edirik."
              : "We believe that a quality holiday starts with the right choice. Therefore, we provide our users with detailed information about the villas and organize the reservation process as simply and transparently as possible."}
          </p>

          <p>
            {isAz 
              ? "Missiyamız qonaqlar ilə keyfiyyətli istirahət məkanları arasında etibarlı körpü yaratmaq, Azərbaycanda villa rezervasiyası sahəsində etibarlı və tanınan platformalardan biri olmaqdır."
              : "Our mission is to create a reliable bridge between guests and quality holiday destinations, and to become one of the reliable and recognized platforms in the field of villa reservation in Azerbaijan."}
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isAz ? "Niyə AREA36?" : "Why AREA36?"}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isAz ? "Premium və diqqətlə seçilmiş villalar" : "Premium and carefully selected villas"}</li>
              <li>{isAz ? "Sadə və rahat rezervasiya prosesi" : "Simple and convenient reservation process"}</li>
              <li>{isAz ? "Operativ müştəri dəstəyi" : "Prompt customer support"}</li>
              <li>{isAz ? "Təhlükəsiz ödəniş və rezervasiya imkanları" : "Secure payment and reservation options"}</li>
              <li>{isAz ? "Qonaq məmnuniyyətinə yönəlmiş xidmət yanaşması" : "Service approach focused on guest satisfaction"}</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 mt-12 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {isAz ? "Əlaqə" : "Contact"}
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
