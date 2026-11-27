import Image from 'next/image'

import {AspectRatio} from '@/components/ui/aspect-ratio'
import type {ContentText} from '@/content/types'
import {RichText} from '@/components/sections/rich-text'

export type TimelineItem = {
  id: string
  title: string
  date: string
  place: string
  body: ContentText
  photo: {src: string; alt: string}
}

/** Story milestones in order, each with a photo. Photos alternate sides on wide screens. */
export function Timeline({items}: {items: TimelineItem[]}) {
  return (
    <ol className="space-y-14 md:space-y-20">
      {items.map((item, index) => (
        <li key={item.id} className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <div className={index % 2 === 1 ? 'md:order-2' : undefined}>
            <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg border bg-muted">
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                // The first photo is near the top of the page, so load it right away.
                priority={index === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </AspectRatio>
          </div>
          <div className="max-w-[65ch]">
            <p className="eyebrow">
              {item.date}
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              {item.place}
            </p>
            <h2 className="mt-2 text-4xl md:text-5xl">{item.title}</h2>
            <RichText value={item.body} className="prose prose-lg mt-4 text-muted-foreground" />
          </div>
        </li>
      ))}
    </ol>
  )
}
