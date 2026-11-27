/**
 * Content shapes for the site. They mirror the Sanity content model in the
 * PRD so phase 2 can swap placeholder data for Sanity data without touching
 * the page sections.
 */

export type Locale = 'en' | 'es'

/** Guest-facing text. Spanish is optional until the Spanish version ships. */
export type LocalizedText = {en: string; es?: string}
export type ContentText = string | object[]
export type LocalizedContent = {en: ContentText; es?: ContentText}

export type ImageContent = {
  src: string
  alt: LocalizedText
  width: number
  height: number
  /** Focal point from 0 to 1 on each axis, like a Sanity hotspot. */
  focus?: {x: number; y: number}
}

export type LinkContent = {label: LocalizedText; href: string}

export type SiteSettingsContent = {
  coupleNames: string
  /** ISO date-time with offset. */
  weddingDateTime: string
  city: LocalizedText
  navItems: LinkContent[]
}

export type HomePageContent = {
  headline: LocalizedText
  intro: LocalizedContent
  heroImage: ImageContent
  ctaButtons: LinkContent[]
}

export type StoryMilestoneContent = {
  id: string
  title: LocalizedText
  /** Free text such as "Spring 2019", so exact days are optional. */
  date: LocalizedText
  place: LocalizedText
  body: LocalizedContent
  photo: ImageContent
}

export type StoryNoteContent = {
  id: string
  from: string
  body: LocalizedContent
}

export type VenueContent = {
  name: string
  address: LocalizedText
  mapsUrl: string
  parkingNotes: LocalizedText
  accessibilityNotes: LocalizedText
  photo: ImageContent
}

export type EventContent = {
  id: string
  name: LocalizedText
  /** ISO date-times with offset. Left out until the time is confirmed. */
  start?: string
  end?: string
  dressCode: LocalizedText
  description: LocalizedText
}
