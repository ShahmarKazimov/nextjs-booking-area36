import Link from "next/link";
export default function PaymentError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold text-red-600">Ödəniş uğursuz oldu</h1>
      <p className="text-gray-500">Zəhmət olmasa yenidən cəhd edin.</p>
      <Link href="/" className="mt-2 px-6 py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-md">Ana səhifəyə qayıt</Link>
    </div>
  );
}