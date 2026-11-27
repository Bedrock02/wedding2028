import './globals.css'

import type {Metadata} from 'next'
import {Cormorant_Garamond, Inter} from 'next/font/google'

import {getSiteSettings} from '@/sanity/lib/fetch'

const heading = Cormorant_Garamond({
  variable: '--font-cormorant',
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const body = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      template: `%s | ${settings.coupleNames}`,
      default: settings.seo.title || settings.coupleNames,
    },
    description: settings.seo.description,
    robots: {index: settings.allowSearchIndexing, follow: settings.allowSearchIndexing},
  }
}

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
