import WishlistContent from "@/components/Wishlist/WishlistContent";

// Personal, per-browser page: keep it out of search results
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "az" ? "Sevimlilər" : "Wishlist",
    robots: { index: false, follow: true },
  };
}

export default function WishlistPage() {
  return <WishlistContent />;
}
