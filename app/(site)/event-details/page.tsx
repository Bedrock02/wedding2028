import type {Metadata} from 'next'

import {EventCard} from '@/components/sections/event-card'
import {PageHeader} from '@/components/sections/page-header'
import {VenueCard} from '@/components/sections/venue-card'
import {events, siteSettings, venue} from '@/content/placeholder'
import {formatLongDate, formatTime} from '@/lib/dates'
import {pick} from '@/lib/i18n'

export const metadata: Metadata = {title: 'Event Details'}

export default function EventDetailsPage() {
  const weddingDate = formatLongDate(siteSettings.weddingDateTime)

  return (
    <>
      <PageHeader eyebrow={weddingDate} title="Event Details" />

      <section className="container grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <EventCard
            key={event.id}
            name={pick(event.name)}
            date={event.start ? formatLongDate(event.start) : weddingDate}
            time={
              event.start
                ? [formatTime(event.start), event.end && formatTime(event.end)].filter(Boolean).join(' to ')
                : 'Time to be announced'
            }
            dressCode={pick(event.dressCode)}
            description={pick(event.description)}
          />
        ))}
      </section>

      <section className="container mt-10 md:mt-14">
        <VenueCard
          name={venue.name}
          address={pick(venue.address)}
          mapsUrl={venue.mapsUrl}
          mapsLabel="Open in Maps"
          photo={{src: venue.photo.src, alt: pick(venue.photo.alt)}}
          details={[
            {label: 'Parking', text: pick(venue.parkingNotes)},
            {label: 'Accessibility', text: pick(venue.accessibilityNotes)},
          ]}
        />
      </section>
    </>
  )
}
