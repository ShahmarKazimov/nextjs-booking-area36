import Link from "next/link";
export default function PaymentError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-red-600">Ödəniş uğursuz oldu</h1>
      <p className="text-gray-500">Zəhmət olmasa yenidən cəhd edin.</p>
      <Link href="/" className="text-blue-500 underline">Ana səhifəyə qayıt</Link>
    </div>
  );
}