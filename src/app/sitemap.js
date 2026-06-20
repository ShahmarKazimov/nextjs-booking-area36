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

  const staticPages = ["about", "privacy-policy"];

  const staticUrls = staticPages.flatMap((page) => [
    {
      url: `https://area36.az/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `https://area36.az/${page}`,
          az: `https://area36.az/az/${page}`,
        },
      },
    },
    {
      url: `https://area36.az/az/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `https://area36.az/${page}`,
          az: `https://area36.az/az/${page}`,
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
    ...staticUrls,
  ];
}