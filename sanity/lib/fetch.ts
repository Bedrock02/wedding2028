import 'server-only'

import type {
  ImageContent,
  LocalizedContent,
  LocalizedText,
  SiteSettingsContent,
  VenueContent,
} from '@/content/types'
import {events, homePage, siteSettings, storyMilestones, storyNotes, venue} from '@/content/placeholder'
import {client} from '@/sanity/lib/client'

import {
  eventDetailsPageQuery,
  eventsQuery,
  homePageQuery,
  siteSettingsQuery,
  storyMilestonesQuery,
  storyPageQuery,
} from './queries'

type SiteContent = SiteSettingsContent & {
  seo: {title: string; description: string}
  allowSearchIndexing: boolean
  venue?: VenueContent
}

type CmsImage = {
  src?: string | null
  alt?: unknown
  width?: number | null
  height?: number | null
  focus?: {x: number; y: number} | null
}

const cache = (tags: string[]) => ({
  cache: 'force-cache' as const,
  next: {tags, revalidate: 3600},
})

function localizedText(value: unknown, fallback: LocalizedText): LocalizedText {
  if (!value || typeof value !== 'object' || !('en' in value)) return fallback
  const text = value as {en?: unknown; es?: unknown}
  if (typeof text.en !== 'string') return fallback
  return {en: text.en, ...(typeof text.es === 'string' ? {es: text.es} : {})}
}

function localizedContent(value: unknown, fallback: LocalizedContent): LocalizedContent {
  if (!value || typeof value !== 'object' || !('en' in value)) return fallback
  const content = value as {en?: unknown; es?: unknown}
  const isContent = (input: unknown): input is string | object[] =>
    typeof input === 'string' || (Array.isArray(input) && input.every((item) => !!item && typeof item === 'object'))
  if (!isContent(content.en)) return fallback
  return {
    en: content.en,
    ...(isContent(content.es) ? {es: content.es} : {}),
  }
}

function withImage(image: CmsImage | null | undefined, fallback: ImageContent): ImageContent {
  if (!image?.src) return fallback
  return {
    src: image.src,
    alt: localizedText(image.alt, fallback.alt),
    width: image.width ?? fallback.width,
    height: image.height ?? fallback.height,
    focus: image.focus ?? fallback.focus,
  }
}

export async function getSiteSettings(): Promise<SiteContent> {
  const result = await client.fetch(siteSettingsQuery, {}, cache(['siteSettings', 'venue']))
  if (!result) {
    return {
      ...siteSettings,
      seo: {
        title: siteSettings.coupleNames,
        description: 'Steven and Michelle are getting married in Sayville, New York.',
      },
      allowSearchIndexing: false,
    }
  }
  const cmsVenue = result.venue
  return {
    coupleNames: result.coupleNames || siteSettings.coupleNames,
    weddingDateTime: result.weddingDateTime || siteSettings.weddingDateTime,
    city: localizedText(result.city, siteSettings.city),
    navItems: result.navItems?.length
      ? result.navItems.map((item) => ({label: localizedText(item.label, {en: ''}), href: item.href}))
      : siteSettings.navItems,
    seo: {
      title: result.seo?.title || siteSettings.coupleNames,
      description: result.seo?.description || 'Steven and Michelle are getting married in Sayville, New York.',
    },
    allowSearchIndexing: result.allowSearchIndexing === true,
    venue: cmsVenue
      ? {
          name: cmsVenue.name || venue.name,
          address: localizedText(cmsVenue.address, venue.address),
          mapsUrl: cmsVenue.mapsUrl || venue.mapsUrl,
          parkingNotes: localizedText(cmsVenue.parkingNotes, venue.parkingNotes),
          accessibilityNotes: localizedText(cmsVenue.accessibilityNotes, venue.accessibilityNotes),
          photo: withImage(cmsVenue.photo, venue.photo),
        }
      : undefined,
  }
}

export async function getHomePage() {
  const result = await client.fetch(homePageQuery, {}, cache(['homePage']))
  return {
    headline: localizedText(result?.headline, homePage.headline),
    ctaButtons: result?.ctaButtons?.length
      ? result.ctaButtons.map((item) => ({label: localizedText(item.label, {en: ''}), href: item.href}))
      : homePage.ctaButtons,
    countdownLabel: result?.countdownLabel
      ? localizedText(result.countdownLabel, {en: 'Counting down'})
      : undefined,
    countdownHeading: result?.countdownHeading
      ? localizedText(result.countdownHeading, {en: 'Until we say “I do”'})
      : undefined,
    countdownDoneMessage: result?.countdownDoneMessage
      ? localizedText(result.countdownDoneMessage, {en: 'We’re married!'})
      : undefined,
    intro: localizedContent(result?.intro, homePage.intro),
    heroImage: withImage(result?.heroImage, homePage.heroImage),
  }
}

export async function getStoryPage() {
  const [page, milestones] = await Promise.all([
    client.fetch(storyPageQuery, {}, cache(['storyPage'])),
    client.fetch(storyMilestonesQuery, {}, cache(['storyMilestone'])),
  ])

  return {
    eyebrow: localizedText(page?.eyebrow, {en: 'How we got here'}),
    title: localizedText(page?.title, {en: 'Our Story'}),
    notesHeading: localizedText(page?.notesHeading, {en: 'A note from each of us'}),
    notes: page?.notes?.length
      ? page.notes.map((note) => ({
          id: note._key ?? note.from.toLowerCase(),
          from: note.from,
          body: localizedContent(note.body, {en: ''}),
        }))
      : storyNotes,
    milestones: milestones?.length
      ? milestones.map((milestone, index) => ({
          id: milestone.id,
          title: localizedText(milestone.title, {en: ''}),
          date: localizedText(milestone.date, {en: ''}),
          place: localizedText(milestone.place, {en: ''}),
          body: localizedContent(milestone.body, {en: ''}),
          photo: withImage(milestone.photo, storyMilestones[index]?.photo ?? homePage.heroImage),
        }))
      : storyMilestones,
  }
}

export async function getEventDetails() {
  const [eventList, settings, page] = await Promise.all([
    client.fetch(eventsQuery, {}, cache(['event'])),
    getSiteSettings(),
    client.fetch(eventDetailsPageQuery, {}, cache(['eventDetailsPage'])),
  ])
  const normalizedEvents = eventList?.length
    ? eventList.map((event) => ({
        ...event,
        name: localizedText(event.name, {en: ''}),
        dressCode: localizedText(event.dressCode, {en: 'Dress code to be announced'}),
        description: localizedText(event.description, {en: ''}),
      }))
    : events
  return {
    events: normalizedEvents,
    venue: settings.venue ?? venue,
    title: localizedText(page?.title, {en: 'Event Details'}),
  }
}
