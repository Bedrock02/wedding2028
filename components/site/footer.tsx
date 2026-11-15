import {Ornament} from '@/components/sections/ornament'

export function Footer({coupleNames, date, city}: {coupleNames: string; date: string; city: string}) {
  return (
    <footer className="mt-16 border-t bg-footer py-12 text-center text-footer-foreground md:mt-24">
      <div className="container">
        <p className="font-heading text-4xl">{coupleNames}</p>
        <Ornament className="mt-4" />
        <p className="mt-4 text-base">
          <span className="block sm:inline">{date}</span>
          <span aria-hidden="true" className="mx-2 hidden sm:inline">
            ·
          </span>
          <span className="block sm:inline">{city}</span>
        </p>
      </div>
    </footer>
  )
}
