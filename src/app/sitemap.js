import homes from "../components/data/homes";

export default function sitemap() {
  const defaultHomeUrls = homes.map((home) => ({
    url: `https://area36.az/${home.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const azHomeUrls = homes.map((home) => ({
    url: `https://area36.az/az/${home.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: "https://area36.az", lastModified: new Date(), priority: 1, changeFrequency: "daily" },
    { url: "https://area36.az/az", lastModified: new Date(), priority: 1, changeFrequency: "daily" },
    ...defaultHomeUrls,
    ...azHomeUrls,
  ];
}