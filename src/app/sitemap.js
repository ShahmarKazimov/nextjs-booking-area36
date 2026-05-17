import homes from "../components/data/homes";

export default function sitemap() {
  const homeUrls = homes.map((home) => ({
    url: `https://area36.az/${home.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: "https://area36.az", lastModified: new Date(), priority: 1 },
    ...homeUrls,
  ];
}