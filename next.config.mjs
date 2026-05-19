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

      // area36- → qafqaz- olanlar
      { source: "/area36-wooden-chalet",    destination: "/qafqaz-wooden-chalet",    permanent: true },
      { source: "/area36-falcon-chalet",    destination: "/qafqaz-falcon-chalet",    permanent: true },
      { source: "/area36-rolling-bungalow", destination: "/qafqaz-rolling-bungalow", permanent: true },

      // qafqaz- → area36- olanlar
      { source: "/qafqaz-luxury-chalet",    destination: "/area36-luxury-chalet",    permanent: true },
      { source: "/qafqaz-family-chalet",    destination: "/area36-family-chalet",    permanent: true },
      { source: "/qafqaz-golden-loft",      destination: "/area36-golden-loft",      permanent: true },
      { source: "/qafqaz-royal-chalet",     destination: "/area36-royal-chalet",     permanent: true },
      { source: "/qafqaz-magnolia-harmony", destination: "/area36-magnolia-harmony", permanent: true },

      // Məzmunu dəyişən səhifə → ən yaxın alternativ
      { source: "/qafqaz-modern-harmony",   destination: "/qafqaz-riverside-chalet", permanent: true },
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

export default nextConfig;