import {defineQuery} from 'next-sanity'

const imageProjection = `{
  alt,
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "focus": hotspot {x, y}
}`

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  coupleNames, weddingDateTime, city, hashtag, navItems,
  "venue": venue->{name, address, mapsUrl, parkingNotes, accessibilityNotes, photo ${imageProjection}},
  seo, allowSearchIndexing
}`)

export const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  headline, intro, countdownLabel, countdownHeading, countdownDoneMessage,
  ctaButtons,
  "heroImage": heroImage ${imageProjection}
}`)

export const storyPageQuery = defineQuery(`*[_id == "storyPage"][0]{
  eyebrow, title, notesHeading,
  notes[]{_key, from, body}
}`)

export const storyMilestonesQuery = defineQuery(`*[_type == "storyMilestone"]|order(order asc){
  "id": _id, title, date, place, body,
  "photo": photo ${imageProjection}
}`)

export const eventDetailsPageQuery = defineQuery(`*[_id == "eventDetailsPage"][0]{title}`)

export const eventsQuery = defineQuery(`*[_type == "event" && audience == "everyone"]|order(order asc){
  "id": _id, name, start, end, dressCode, description
}`)
