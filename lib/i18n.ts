import type {Locale, LocalizedText} from '@/content/types'

/** The site is English only for now; the Spanish toggle comes later. */
export const defaultLocale: Locale = 'en'

/** Pick the text for a locale, falling back to English. */
export function pick(text: LocalizedText, locale: Locale = defaultLocale): string {
  return text[locale] ?? text.en
}
