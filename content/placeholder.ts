/**
 * Placeholder content for phase 1. Everything here moves into Sanity in
 * phase 2. Text marked "Placeholder" is not real and needs replacing.
 */

import type {
  EventContent,
  HomePageContent,
  SiteSettingsContent,
  StoryMilestoneContent,
  StoryNoteContent,
  VenueContent,
} from './types'

export const siteSettings: SiteSettingsContent = {
  coupleNames: 'Steven & Michelle',
  // The date is real; the 4:00 PM time is a placeholder until the ceremony time is set.
  weddingDateTime: '2028-08-20T16:00:00-04:00',
  city: {en: 'Sayville, New York', es: 'Sayville, Nueva York'},
  navItems: [
    {label: {en: 'Home', es: 'Inicio'}, href: '/'},
    {label: {en: 'Our Story', es: 'Nuestra historia'}, href: '/our-story'},
    {label: {en: 'Event Details', es: 'Detalles del evento'}, href: '/event-details'},
  ],
}

export const homePage: HomePageContent = {
  headline: {en: 'We’re getting married', es: 'Nos casamos'},
  intro: {
    en: 'We can’t wait to celebrate with you by the water. More details will appear here as the day gets closer.',
    es: 'Estamos ansiosos por celebrar con ustedes junto al agua. Pronto habrá más detalles aquí.',
  },
  heroImage: {
    src: '/placeholders/hero.svg',
    alt: {en: 'Placeholder for a photo of Steven and Michelle'},
    width: 1600,
    height: 1600,
    focus: {x: 0.5, y: 0.45},
  },
  ctaButtons: [
    {label: {en: 'Our Story', es: 'Nuestra historia'}, href: '/our-story'},
    {label: {en: 'Event Details', es: 'Detalles del evento'}, href: '/event-details'},
  ],
}

export const storyMilestones: StoryMilestoneContent[] = [
  {
    id: 'how-we-met',
    title: {en: 'How we met'},
    date: {en: 'Placeholder date'},
    place: {en: 'Placeholder place'},
    body: {
      en: 'Placeholder. A few sentences about how we met will go here: where we were, who said hello first, and what we each remember about that day.',
    },
    photo: {
      src: '/placeholders/story-1.svg',
      alt: {en: 'Placeholder for a photo from when we met'},
      width: 1200,
      height: 900,
    },
  },
  {
    id: 'first-date',
    title: {en: 'Our first date'},
    date: {en: 'Placeholder date'},
    place: {en: 'Placeholder place'},
    body: {
      en: 'Placeholder. The story of our first date will go here: where we went, how long we stayed, and when we knew there would be a second one.',
    },
    photo: {
      src: '/placeholders/story-2.svg',
      alt: {en: 'Placeholder for a photo from our first date'},
      width: 1200,
      height: 900,
    },
  },
  {
    id: 'the-proposal',
    title: {en: 'The proposal'},
    date: {en: 'Placeholder date'},
    place: {en: 'Placeholder place'},
    body: {
      en: 'Placeholder. The proposal story will go here: the plan, the surprise, and the answer.',
    },
    photo: {
      src: '/placeholders/story-3.svg',
      alt: {en: 'Placeholder for a photo from the proposal'},
      width: 1200,
      height: 900,
    },
  },
]

export const storyNotes: StoryNoteContent[] = [
  {
    id: 'steven',
    from: 'Steven',
    body: {en: 'Placeholder. A short note from Steven will go here.'},
  },
  {
    id: 'michelle',
    from: 'Michelle',
    body: {en: 'Placeholder. A short note from Michelle will go here.'},
  },
]

export const venue: VenueContent = {
  name: 'Land’s End Waterfront Catering',
  // The street address gets entered from the signed contract.
  address: {en: 'Sayville, New York', es: 'Sayville, Nueva York'},
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Land%27s+End+Waterfront+Catering+Sayville+NY',
  parkingNotes: {en: 'Placeholder. Parking details will be added here.'},
  accessibilityNotes: {en: 'Placeholder. Accessibility details will be added here.'},
  photo: {
    src: '/placeholders/venue.svg',
    alt: {en: 'Placeholder for a photo of the venue'},
    width: 1600,
    height: 900,
  },
}

export const events: EventContent[] = [
  {
    id: 'ceremony',
    name: {en: 'Ceremony', es: 'Ceremonia'},
    dressCode: {en: 'Dress code to be announced'},
    description: {en: 'Placeholder. A line or two about the ceremony will go here.'},
  },
  {
    id: 'reception',
    name: {en: 'Reception', es: 'Recepción'},
    dressCode: {en: 'Dress code to be announced'},
    description: {en: 'Placeholder. A line or two about the reception will go here.'},
  },
]
