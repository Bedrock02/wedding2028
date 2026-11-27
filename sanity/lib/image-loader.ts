import type {ImageLoaderProps} from 'next/image'

/** Use Sanity's CDN transforms rather than consuming Vercel image transforms. */
export default function sanityImageLoader({src, width, quality}: ImageLoaderProps) {
  if (src.startsWith('/')) return src

  const url = new URL(src)
  if (url.hostname !== 'cdn.sanity.io') {
    throw new Error(`Expected a Sanity CDN image URL, received ${url.hostname}`)
  }

  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 75))
  url.searchParams.set('auto', 'format')
  return url.toString()
}
