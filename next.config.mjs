/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",

        has: [{ type: "host", value: "site-potfolio-seven.vercel.app" }],

        destination: "https://henriquebragadev.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
