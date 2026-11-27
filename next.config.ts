import type {NextConfig} from 'next'

import {apiVersion, dataset, projectId} from './sanity/lib/api'

const nextConfig: NextConfig = {
  // Pin the workspace root so a lockfile in a parent folder is ignored.
  turbopack: {root: __dirname},
  images: {loader: 'custom', loaderFile: './sanity/lib/image-loader.ts'},
  async headers() {
    let allowSearchIndexing = false

    try {
      const query = encodeURIComponent('*[_id == "siteSettings"][0].allowSearchIndexing')
      const response = await fetch(
        `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
        {cache: 'no-store', signal: AbortSignal.timeout(3000)},
      )
      if (response.ok) {
        const data = (await response.json()) as {result?: boolean}
        allowSearchIndexing = data.result === true
      }
    } catch {
      // Fail closed: a missing setting or unavailable dataset must stay noindex.
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: allowSearchIndexing ? 'index, follow' : 'noindex, nofollow',
          },
        ],
      },
    ]
  },
}

export default nextConfig
