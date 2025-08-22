import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hqsiaduxwwlpukwdtyui.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/note-uploads/**',
      },
    ],
  },
};

export default nextConfig;
