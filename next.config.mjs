import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// [köhnə slug, yeni slug] — yeni slug əlavə edəndə buraya yazın
const slugRedirects = [
  // area36- → qafqaz-
  ["area36-wooden-chalet", "qafqaz-wooden-chalet"],
  ["area36-falcon-chalet", "qafqaz-falcon-chalet"],
  // qafqaz- → area36-
  ["qafqaz-luxury-chalet", "area36-luxury-chalet"],
  ["qafqaz-family-chalet", "area36-family-chalet"],
  ["qafqaz-golden-loft", "area36-golden-loft"],
  ["qafqaz-royal-chalet", "area36-royal-chalet"],
  ["qafqaz-magnolia-harmony", "area36-magnolia-harmony"],
  // Məzmunu dəyişən səhifə → ən yaxın alternativ
  ["qafqaz-modern-harmony", "qafqaz-riverside-chalet"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 300, 600],
  },

  async redirects() {
    return [
      // www → www-suz (ən üstdə olmalıdır)
      {
        source: "/:path*",
        destination: "https://area36.az/:path*",
        permanent: true,
        has: [{ type: "host", value: "www.area36.az" }],
      },

      // Köhnə slug → yeni slug (həm prefikssiz, həm /en|/az prefiksli köhnə URL-lər üçün)
      ...slugRedirects.flatMap(([from, to]) => [
        { source: `/${from}`, destination: `/${to}`, permanent: true },
        { source: `/:locale(en|az)/${from}`, destination: `/:locale/${to}`, permanent: true },
      ]),
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);