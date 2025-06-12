import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
};

export default nextConfig;
