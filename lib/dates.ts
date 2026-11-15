import type {Locale} from '@/content/types'

/** Every date on the site is shown in the venue's time zone. */
const timeZone = 'America/New_York'

const localeTags: Record<Locale, string> = {en: 'en-US', es: 'es-US'}

/** "Sunday, August 20, 2028" */
export function formatLongDate(iso: string, locale: Locale = 'en'): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(new Date(iso))
}

/** "4:00 PM" */
export function formatTime(iso: string, locale: Locale = 'en'): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(new Date(iso))
}
