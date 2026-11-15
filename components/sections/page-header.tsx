import {Ornament} from './ornament'

/** Title block at the top of every page except Home. */
export function PageHeader({eyebrow, title, intro}: {eyebrow?: string; title: string; intro?: string}) {
  return (
    <header className="container py-12 text-center md:py-20">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-2 text-5xl md:text-7xl">{title}</h1>
      <Ornament className="mt-6" />
      {intro && <p className="mx-auto mt-6 max-w-[65ch] text-muted-foreground">{intro}</p>}
    </header>
  )
}
