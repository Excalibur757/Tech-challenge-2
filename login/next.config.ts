import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
  },
  async rewrites() {
    return [
      // 🔹 HOME assets
      {
        source: '/home/_next/:path*',
        destination: 'http://home:3000/_next/:path*', // nome do serviço Docker
      },
      // 🔹 HOME páginas
      {
        source: '/home/:path*',
        destination: 'http://home:3000/:path*',
      },
      // 🔹 EXTRATO assets
      {
        source: '/extrato/_next/:path*',
        destination: 'http://extrato:3000/_next/:path*',
      },
      // 🔹 EXTRATO páginas
      {
        source: '/extrato/:path*',
        destination: 'http://extrato:3000/:path*',
      },
    ];
  },
};

export default nextConfig;
