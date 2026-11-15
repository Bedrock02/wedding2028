import Image from 'next/image'
import Link from 'next/link'

import {Button} from '@/components/ui/button'

export type HeroProps = {
  eyebrow: string
  coupleNames: string
  date: string
  city: string
  image: {src: string; alt: string; focus?: {x: number; y: number}}
  buttons: {label: string; href: string}[]
}

/** Full-bleed photo with the names, date and city: 4:5 on phones, 16:9 on wider screens. */
export function Hero({eyebrow, coupleNames, date, city, image, buttons}: HeroProps) {
  const focus = image.focus ?? {x: 0.5, y: 0.5}

  return (
    <section className="relative isolate aspect-[4/5] max-h-[calc(100svh-4rem)] w-full overflow-hidden bg-primary md:aspect-[16/9]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{objectPosition: `${focus.x * 100}% ${focus.y * 100}%`}}
      />
      {/* Scrim so the white text stays readable on any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-[#0d1830]/90 via-[#0d1830]/45 to-[#0d1830]/10"
      />
      <div className="absolute inset-x-0 bottom-0 container pb-10 text-center text-white md:pb-16">
        <p className="eyebrow text-[#f3e3b8]">{eyebrow}</p>
        <h1 className="mt-3 text-6xl leading-none sm:text-7xl md:text-8xl">{coupleNames}</h1>
        <p className="mt-4 text-lg md:text-xl">
          <span className="block sm:inline">{date}</span>
          <span aria-hidden="true" className="mx-2 hidden text-[#f3e3b8] sm:inline">
            ·
          </span>
          <span className="block sm:inline">{city}</span>
        </p>
        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {buttons.map((button, index) => (
            <Button
              key={button.href}
              asChild
              size="lg"
              className={
                index === 0
                  ? 'bg-background text-foreground hover:bg-background/90'
                  : 'border border-white/70 bg-transparent text-white hover:bg-white/15'
              }
            >
              <Link href={button.href}>{button.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
