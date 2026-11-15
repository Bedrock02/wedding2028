import {MapPinIcon} from 'lucide-react'
import Image from 'next/image'

import {AspectRatio} from '@/components/ui/aspect-ratio'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'

export type VenueCardProps = {
  name: string
  address: string
  mapsUrl: string
  mapsLabel: string
  photo: {src: string; alt: string}
  details: {label: string; text: string}[]
}

export function VenueCard({name, address, mapsUrl, mapsLabel, photo, details}: VenueCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="object-cover"
        />
      </AspectRatio>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-4xl">{name}</h2>
            <p className="mt-1 text-muted-foreground">{address}</p>
          </div>
          <Button asChild size="lg">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPinIcon aria-hidden="true" />
              {mapsLabel}
            </a>
          </Button>
        </div>
        <Separator />
        <dl className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="font-heading text-2xl font-medium">{detail.label}</dt>
              <dd className="mt-1 text-muted-foreground">{detail.text}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
