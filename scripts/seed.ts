import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

import {getCliClient} from 'sanity/cli'

import {apiVersion} from '../sanity/lib/api'
import {events, homePage, siteSettings, storyMilestones, storyNotes, venue} from '../content/placeholder'

const client = getCliClient({apiVersion})
const placeholdersDir = join(process.cwd(), 'public', 'placeholders')

function block(text: string) {
  return [
    {
      _type: 'block',
      _key: 'paragraph',
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: 'text', text, marks: []}],
    },
  ]
}

function localizedBlock(text: {en: string; es?: string}) {
  return {
    _type: 'localeBlockContent',
    en: block(text.en),
    ...(text.es ? {es: block(text.es)} : {}),
  }
}

async function imageWithAlt(name: string, alt: {en: string; es?: string}) {
  const file = await readFile(join(placeholdersDir, name))
  const asset = await client.assets.upload('image', file, {filename: name})
  return {
    _type: 'imageWithAlt',
    alt: {_type: 'localeString', ...alt},
    asset: {_type: 'reference', _ref: asset._id},
    hotspot: {x: 0.5, y: 0.5, width: 1, height: 1},
  }
}

async function seed() {
  const [hero, venuePhoto, ...storyPhotos] = await Promise.all([
    imageWithAlt('hero.svg', homePage.heroImage.alt),
    imageWithAlt('venue.svg', venue.photo.alt),
    ...storyMilestones.map((milestone, index) =>
      imageWithAlt(`story-${index + 1}.svg`, milestone.photo.alt),
    ),
  ])

  const documents: Array<{_id: string; _type: string; [key: string]: unknown}> = [
    {
      _id: 'venue-landsend',
      _type: 'venue',
      name: venue.name,
      address: {_type: 'localeText', ...venue.address},
      mapsUrl: venue.mapsUrl,
      parkingNotes: {_type: 'localeText', ...venue.parkingNotes},
      accessibilityNotes: {_type: 'localeText', ...venue.accessibilityNotes},
      photo: venuePhoto,
    },
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      ...siteSettings,
      city: {_type: 'localeString', ...siteSettings.city},
      venue: {_type: 'reference', _ref: 'venue-landsend'},
      navItems: siteSettings.navItems.map((item) => ({
        _key: item.href.replaceAll('/', '-') || 'home',
        _type: 'siteLink',
        label: {_type: 'localeString', ...item.label},
        href: item.href,
      })),
      seo: {
        title: 'Steven & Michelle',
        description: 'Join Steven and Michelle in Sayville, New York, on August 20, 2028.',
      },
      allowSearchIndexing: false,
    },
    {
      _id: 'homePage',
      _type: 'homePage',
      headline: {_type: 'localeString', ...homePage.headline},
      intro: localizedBlock(homePage.intro as {en: string; es?: string}),
      heroImage: hero,
      ctaButtons: homePage.ctaButtons.map((item) => ({
        _key: item.href.replaceAll('/', '-') || 'home',
        _type: 'siteLink',
        label: {_type: 'localeString', ...item.label},
        href: item.href,
      })),
      countdownLabel: {_type: 'localeString', en: 'Counting down'},
      countdownHeading: {_type: 'localeString', en: 'Until we say “I do”'},
      countdownDoneMessage: {_type: 'localeString', en: 'We’re married!'},
    },
    {
      _id: 'storyPage',
      _type: 'storyPage',
      eyebrow: {_type: 'localeString', en: 'How we got here'},
      title: {_type: 'localeString', en: 'Our Story'},
      notesHeading: {_type: 'localeString', en: 'A note from each of us'},
      notes: storyNotes.map((note) => ({
        _key: note.id,
        _type: 'object',
        from: note.from,
        body: localizedBlock(note.body as {en: string; es?: string}),
      })),
    },
    {
      _id: 'eventDetailsPage',
      _type: 'eventDetailsPage',
      title: {_type: 'localeString', en: 'Event Details'},
    },
    ...storyMilestones.map((milestone, index) => ({
      _id: `story-${milestone.id}`,
      _type: 'storyMilestone',
      title: {_type: 'localeString', ...milestone.title},
      date: {_type: 'localeString', ...milestone.date},
      place: {_type: 'localeString', ...milestone.place},
      body: localizedBlock(milestone.body as {en: string; es?: string}),
      photo: storyPhotos[index],
      order: index + 1,
    })),
    ...events.map((event, index) => ({
      _id: `event-${event.id}`,
      _type: 'event',
      name: {_type: 'localeString', ...event.name},
      ...(event.start ? {start: event.start} : {}),
      ...(event.end ? {end: event.end} : {}),
      venue: {_type: 'reference', _ref: 'venue-landsend'},
      dressCode: {_type: 'localeString', ...event.dressCode},
      description: {_type: 'localeText', ...event.description},
      audience: 'everyone',
      order: index + 1,
    })),
  ]

  for (const document of documents) {
    await client.createIfNotExists(document)
    console.log(`Seeded ${document._id} (existing documents were left unchanged)`)
  }
}

seed().catch((error: unknown) => {
  console.error('Sanity seed failed:', error)
  process.exitCode = 1
})
