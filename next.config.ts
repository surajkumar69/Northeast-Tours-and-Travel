import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/journeys',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/journeys/:slug',
        destination: '/packages/:slug',
        permanent: true,
      },
      {
        source: '/tempos',
        destination: '/tempo-traveller',
        permanent: true,
      },
      {
        source: '/tempo-travellers',
        destination: '/tempo-traveller',
        permanent: true,
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      }
    ],
  },
};

export default nextConfig;
