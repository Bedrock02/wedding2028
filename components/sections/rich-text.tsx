import {PortableText, type PortableTextBlock} from 'next-sanity'

import type {ContentText} from '@/content/types'

export function RichText({value, className}: {value: ContentText; className?: string}) {
  if (typeof value === 'string') return <p className={className}>{value}</p>

  return (
    <div className={className}>
      <PortableText value={value as PortableTextBlock[]} />
    </div>
  )
}
