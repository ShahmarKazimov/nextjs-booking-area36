import homes from "../components/data/homes";

export default function sitemap() {
  const homeUrls = homes.flatMap((home) => [
    {
      url: `https://area36.az/${home.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `https://area36.az/${home.slug}`,
          az: `https://area36.az/az/${home.slug}`,
        },
      },
    },
    {
      url: `https://area36.az/az/${home.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `https://area36.az/${home.slug}`,
          az: `https://area36.az/az/${home.slug}`,
        },
      },
    },
  ]);

  return [
    {
      url: "https://area36.az",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
      alternates: {
        languages: {
          en: "https://area36.az",
          az: "https://area36.az/az",
        },
      },
    },
    {
      url: "https://area36.az/az",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
      alternates: {
        languages: {
          en: "https://area36.az",
          az: "https://area36.az/az",
        },
      },
    },
    ...homeUrls,
  ];
}