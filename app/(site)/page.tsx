import {Countdown} from '@/components/sections/countdown'
import {Hero} from '@/components/sections/hero'
import {Ornament} from '@/components/sections/ornament'
import {homePage, siteSettings} from '@/content/placeholder'
import {formatLongDate} from '@/lib/dates'
import {pick} from '@/lib/i18n'

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={pick(homePage.headline)}
        coupleNames={siteSettings.coupleNames}
        date={formatLongDate(siteSettings.weddingDateTime)}
        city={pick(siteSettings.city)}
        image={{
          src: homePage.heroImage.src,
          alt: pick(homePage.heroImage.alt),
          focus: homePage.heroImage.focus,
        }}
        buttons={homePage.ctaButtons.map((button) => ({label: pick(button.label), href: button.href}))}
      />

      <section className="container pt-14 text-center md:pt-20">
        <p className="eyebrow">Counting down</p>
        <h2 className="mt-2 text-4xl md:text-5xl">Until we say “I do”</h2>
        <Ornament className="mt-6 mb-8" />
        <Countdown target={siteSettings.weddingDateTime} doneMessage="We’re married!" />
        <p className="mx-auto mt-10 max-w-[65ch] text-muted-foreground">{pick(homePage.intro)}</p>
      </section>
    </>
  )
}
