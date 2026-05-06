/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async rewrites() {
    return [
      { source: "/attente", destination: "/attente.html" },
    ];
  },
};
module.exports = nextConfig;
