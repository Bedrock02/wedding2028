import './globals.css'

import type {Metadata} from 'next'
import {Cormorant_Garamond, Inter} from 'next/font/google'

const heading = Cormorant_Garamond({
  variable: '--font-heading',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const body = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Steven & Michelle',
    default: 'Steven & Michelle',
  },
  description: 'Steven and Michelle are getting married on August 20, 2028 in Sayville, New York.',
  // Keep search engines out until allowSearchIndexing exists (phase 2).
  robots: {index: false, follow: false},
}

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
