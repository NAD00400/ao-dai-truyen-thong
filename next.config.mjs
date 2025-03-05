/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ao-dai-truyen-thong-l9fdekfej-nkaduy040s-projects.vercel.app',
      'brojqgdjcljbprhn.public.blob.vercel-storage.com' // Nếu bạn dùng Vercel Storage
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
