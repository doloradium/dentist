import type { NextConfig } from 'next'

const isExport = process.env.STATIC_EXPORT === 'true'

const nextConfig: NextConfig = {
  ...(isExport ? { output: 'export' } : {}),
  images: {
    unoptimized: isExport,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}

export default nextConfig
