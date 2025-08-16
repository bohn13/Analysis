import NextBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
