import type {Metadata} from 'next'
import Link from 'next/link'

import {Ornament} from '@/components/sections/ornament'
import {SiteShell} from '@/components/site/site-shell'
import {Button} from '@/components/ui/button'

export const metadata: Metadata = {title: 'Page not found'}

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container py-20 text-center md:py-28">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-2 text-5xl md:text-7xl">We couldn’t find that page</h1>
        <Ornament className="mt-6" />
        <p className="mx-auto mt-6 max-w-[65ch] text-muted-foreground">
          The link may be old or mistyped. Everything about the wedding is a tap away from the home page.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Back to the home page</Link>
        </Button>
      </section>
    </SiteShell>
  )
}
