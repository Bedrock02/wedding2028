import type {Metadata} from 'next'

import {PageHeader} from '@/components/sections/page-header'
import {Timeline} from '@/components/sections/timeline'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {storyMilestones, storyNotes} from '@/content/placeholder'
import {pick} from '@/lib/i18n'

export const metadata: Metadata = {title: 'Our Story'}

export default function OurStoryPage() {
  return (
    <>
      <PageHeader eyebrow="How we got here" title="Our Story" />

      <section className="container">
        <Timeline
          items={storyMilestones.map((milestone) => ({
            id: milestone.id,
            title: pick(milestone.title),
            date: pick(milestone.date),
            place: pick(milestone.place),
            body: pick(milestone.body),
            photo: {src: milestone.photo.src, alt: pick(milestone.photo.alt)},
          }))}
        />
      </section>

      <section className="container mt-16 md:mt-24">
        <h2 className="text-center text-4xl md:text-5xl">A note from each of us</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {storyNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>
                  <h3 className="text-3xl">From {note.from}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pick(note.body)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
