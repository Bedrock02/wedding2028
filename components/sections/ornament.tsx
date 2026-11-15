import {cn} from '@/lib/utils'

/** A thin gold rule with a diamond, used between a heading and what follows. */
export function Ornament({className}: {className?: string}) {
  return (
    <div aria-hidden="true" className={cn('flex items-center justify-center gap-3', className)}>
      <span className="h-px w-12 bg-gold" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-12 bg-gold" />
    </div>
  )
}
