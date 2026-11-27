import type {Metadata} from 'next'

import {PageHeader} from '@/components/sections/page-header'
import {RichText} from '@/components/sections/rich-text'
import {Timeline} from '@/components/sections/timeline'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {getStoryPage} from '@/sanity/lib/fetch'
import {pick, pickContent} from '@/lib/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStoryPage()
  return {title: pick(page.title)}
}

export default async function OurStoryPage() {
  const page = await getStoryPage()
  return (
    <>
      <PageHeader eyebrow={pick(page.eyebrow)} title={pick(page.title)} />

      <section className="container">
        <Timeline
          items={page.milestones.map((milestone) => ({
            id: milestone.id,
            title: pick(milestone.title),
            date: pick(milestone.date),
            place: pick(milestone.place),
            body: pickContent(milestone.body),
            photo: {src: milestone.photo.src, alt: pick(milestone.photo.alt)},
          }))}
        />
      </section>

      <section className="container mt-16 md:mt-24">
        <h2 className="text-center text-4xl md:text-5xl">{pick(page.notesHeading)}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {page.notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>
                  <h3 className="text-3xl">From {note.from}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichText value={pickContent(note.body)} className="text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
