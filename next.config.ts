import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root so a lockfile in a parent folder is ignored.
  turbopack: {root: __dirname},
  // Images come straight from Sanity's CDN (width and format in the URL), so
  // Next.js image optimization stays off and uses none of the Hobby quota.
  images: {unoptimized: true},
  async headers() {
    return [
      {
        // Keep search engines out until allowSearchIndexing exists (phase 2).
        source: '/:path*',
        headers: [{key: 'X-Robots-Tag', value: 'noindex, nofollow'}],
      },
    ]
  },
}

export default nextConfig
