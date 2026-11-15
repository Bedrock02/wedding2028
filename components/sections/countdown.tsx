'use client'

import {useSyncExternalStore} from 'react'

export type CountdownProps = {
  /** ISO date-time with offset. */
  target: string
  /** Shown once the target has passed. */
  doneMessage: string
  labels?: {days: string; hours: string; minutes: string; seconds: string}
}

const defaultLabels = {days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds'}

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000)
  return () => clearInterval(id)
}

const getNow = () => Math.floor(Date.now() / 1000)
// The server can't know the visitor's clock, so the first paint shows dashes.
const getServerNow = () => null

/** Live countdown. Renders dashes on the server and fills in once the page is interactive. */
export function Countdown({target, doneMessage, labels = defaultLabels}: CountdownProps) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow)
  const remaining = now === null ? null : Math.floor(new Date(target).getTime() / 1000) - now

  if (remaining !== null && remaining <= 0) {
    return <p className="text-center font-heading text-4xl">{doneMessage}</p>
  }

  const units = [
    {label: labels.days, value: remaining === null ? null : Math.floor(remaining / 86400)},
    {label: labels.hours, value: remaining === null ? null : Math.floor(remaining / 3600) % 24},
    {label: labels.minutes, value: remaining === null ? null : Math.floor(remaining / 60) % 60},
    {label: labels.seconds, value: remaining === null ? null : remaining % 60},
  ]

  return (
    <div role="timer">
      <dl className="mx-auto grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col-reverse items-center rounded-lg border bg-card px-1 py-4 sm:py-5"
          >
            <dt className="mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase sm:text-sm">
              {unit.label}
            </dt>
            <dd className="font-heading text-4xl leading-none font-semibold lining-nums tabular-nums sm:text-5xl">
              {unit.value ?? '–'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
