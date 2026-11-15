import {Badge} from '@/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'

export type EventCardProps = {
  name: string
  date: string
  /** For example "4:00 PM" or "Time to be announced". */
  time: string
  dressCode: string
  description: string
}

export function EventCard({name, date, time, dressCode, description}: EventCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="eyebrow">{date}</p>
        <CardTitle>
          <h2 className="text-4xl">{name}</h2>
        </CardTitle>
        <p className="text-xl">{time}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {dressCode}
        </Badge>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
