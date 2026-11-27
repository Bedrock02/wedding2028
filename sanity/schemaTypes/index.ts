import {siteSettings} from './singletons/siteSettings'
import {homePage} from './singletons/homePage'
import {storyPage} from './singletons/storyPage'
import {eventDetailsPage} from './singletons/eventDetailsPage'
import {storyMilestone} from './documents/storyMilestone'
import {event} from './documents/event'
import {venue} from './documents/venue'
import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'
import {localeBlockContent} from './objects/localeBlockContent'
import {imageWithAlt} from './objects/imageWithAlt'
import {link} from './objects/link'

export const schemaTypes = [
  siteSettings,
  homePage,
  storyPage,
  eventDetailsPage,
  storyMilestone,
  event,
  venue,
  localeString,
  localeText,
  localeBlockContent,
  imageWithAlt,
  link,
]

/** Types with exactly one document, edited from a fixed entry in the Studio. */
export const singletonTypes = new Set(['siteSettings', 'homePage', 'storyPage', 'eventDetailsPage'])
