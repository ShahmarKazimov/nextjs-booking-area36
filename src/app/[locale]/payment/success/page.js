import Link from "next/link";
export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-green-600">Ödəniş uğurla tamamlandı!</h1>
      <p className="text-gray-500">Tezliklə sizinlə əlaqə saxlayacağıq.</p>
      <Link href="/" className="text-blue-500 underline">Ana səhifəyə qayıt</Link>
    </div>
  );
}