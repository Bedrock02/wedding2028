import {getSiteSettings} from '@/sanity/lib/fetch'
import {formatLongDate} from '@/lib/dates'
import {pick} from '@/lib/i18n'

import {Footer} from './footer'
import {Header} from './header'

/** Header, main area and footer shared by every site page and the 404 page. */
export async function SiteShell({children}: {children: React.ReactNode}) {
  const siteSettings = await getSiteSettings()
  const navItems = siteSettings.navItems.map((item) => ({label: pick(item.label), href: item.href}))

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header coupleNames={siteSettings.coupleNames} navItems={navItems} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer
        coupleNames={siteSettings.coupleNames}
        date={formatLongDate(siteSettings.weddingDateTime)}
        city={pick(siteSettings.city)}
      />
    </div>
  )
}
