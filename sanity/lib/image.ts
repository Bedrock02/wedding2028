import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from '@/sanity/lib/api'

const builder = createImageUrlBuilder({projectId, dataset})

/** Build a Sanity CDN URL; set width and format on the result. */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
