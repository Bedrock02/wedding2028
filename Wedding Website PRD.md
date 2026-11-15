# Wedding Website PRD

Nov 15, 2026 · @Steven

Phase one builds a good-looking wedding site in Next.js on Vercel's free Hobby plan, with every word and photo coming from Sanity Studio, running on its free vercel.app address, then on our own domain once we approve it. Integrations such as RSVP, registry and analytics wait until that foundation is live (see Later). The only running cost is the domain, about $11 a year.

| At a glance |  |
| --- | --- |
| Wedding | Sunday, August 20, 2028, Land's End Waterfront Catering, Sayville, NY |
| Guests | About 85 (78 firm) |
| Hosting | Vercel Hobby, $0 |
| Content | Sanity Free plan, $0 |
| Domain | Cloudflare Registrar, about $10.50 to $11.50 a year for a .com, bought after the site is approved |
| Editors | Steven and Michelle |

## Goals

- A site that looks like us: polished, warm and consistent on every page, designed for phones first.
- Let Steven or Michelle change any text, photo or link in Sanity Studio, on a phone or laptop, and see it live within a minute with no redeploy.
- A clean foundation (typed content model, reusable components, preview deploys) that later features plug into without rework.
- Pay nothing for hosting; the domain is the only bill.
- Content fields ready for a Spanish version later, with no migration.

## Non-goals

- No integrations in this phase: no RSVP, registry, analytics, email or other third-party services (see Later).
- No paid builder or host (The Knot site builder, Zola, Squarespace, Vercel Pro).
- No guest accounts or logins.

## Audience

- **Guests:** about 85 people, mostly on phones, with a wide range of comfort with tech. Large type, obvious buttons, nothing hidden in menus.
- **Editors:** Steven and Michelle in Sanity Studio. The Free plan allows up to 20 seats, so parents or a planner could be added.

## Design and visual direction

Design comes first, built from existing tools rather than a custom component library: Tailwind CSS plus shadcn/ui components, restyled with our wedding theme tokens. We start from Sanity's official Clean Next.js + Sanity app, add shadcn/ui on top, and use the Waterfront classic look, which we picked on November 15, 2026. The other looks stay below for reference; a look is only theme variables and two fonts, so switching later touches one file.

| Look | Palette | Fonts (heading + body) | Corners and accents | Feel |
| --- | --- | --- | --- | --- |
| Waterfront classic (chosen) | Navy, ivory, soft gold | Cormorant Garamond + Inter | Small radius, thin gold borders | Formal, a nod to the Land's End waterfront |
| Garden romantic | Sage, blush, cream | Playfair Display + Lato | Rounded, soft shadows | Soft and floral |
| Modern editorial | Off-black, white, one accent | Fraunces + DM Sans | Square corners, no shadows | Clean, magazine-like, photo-led |
| Warm Latin | Terracotta, marigold, deep green, cream | DM Serif Display + Work Sans | Rounded, bold accent buttons | Festive, a nod to Colombian roots |

- **Stack:** Tailwind CSS and shadcn/ui. shadcn copies each component's source into our repo (components/ui) on top of Radix primitives, so we get accessible pieces we can restyle without building our own library.
- **Starter:** Sanity's Clean Next.js + Sanity app, which already wires Next.js, the embedded Studio and next-sanity; then run the shadcn init to add the theme file and components.
- **Theme tokens:** Waterfront classic lives in shadcn's CSS variables in one globals.css file: ivory background, navy foreground and primary, soft gold accent and borders, and a small radius. Exact color values get set in phase 1. Body text meets WCAG AA contrast (4.5:1).
- **Typography:** Cormorant Garamond for headings and Inter for body, loaded with next/font and mapped to Tailwind font classes. Body text at least 18px on phones.
- **shadcn components we use:** Button, Card, Accordion (FAQ), Navigation Menu and Sheet (mobile menu), Separator, Badge, Aspect Ratio, Carousel (photos) and Dialog (photo viewer). Page sections such as Hero, Countdown, Timeline, EventCard and VenueCard are composed from these.
- **Optional motion add-ons:** Magic UI or Aceternity UI for one or two animated sections, like the hero or the gallery. Both add components the same copy-in way as shadcn; nothing moves when the device asks for reduced motion.
- **Layout:** mobile first; text columns about 65 characters wide; full-bleed hero photos; generous whitespace; a sticky header that becomes a simple menu on phones.
- **Photography:** big photos carry the design. Placeholders until engagement photos; Sanity hotspot crops let one photo work at 4:5 on phones and 16:9 on desktop.
- **Done when:** we both like it on a phone and a laptop, and Lighthouse on mobile scores 95 or higher for performance and accessibility.

## Pages

| Page | What it holds | Phase |
| --- | --- | --- |
| Home | Names, date, city, hero photo, live countdown to August 20, 2028, buttons to Our Story and Event details | 1 |
| Our Story | Timeline of milestones (how we met, first date, proposal) with photos and a short note from each of us | 1 |
| Event details | Ceremony and reception times, venue photo, address with a map link, parking, dress code, accessibility | 1 |
| Travel and stay | Hotel room block (code, rate, booking deadline), other nearby hotels, airports, driving and train options | 4 (block details after the venue room block call) |
| FAQ | Kids, plus-ones, dress code, parking, gifts, unplugged ceremony, weather plan | 4 |
| Schedule | Every wedding-weekend event with add-to-calendar files | 4 |
| Wedding party | Photo, name, role and a one-line intro for each person | 4 |
| Gallery | Engagement photos now, wedding photos after | 4 |

Phase 1 pages are built with placeholder content, then wired to Sanity in phase 2. Across the site: a shared header and footer, a friendly 404 page, a favicon, and (phase 4) a share image so links preview nicely in texts. Registry and RSVP pages are in Later.

## Sanity content model

| Type | Kind | Key fields | Phase |
| --- | --- | --- | --- |
| siteSettings | Singleton | coupleNames, weddingDateTime, venue (ref), heroImage, hashtag, seo (title, description, shareImage), allowSearchIndexing, navItems | 2 |
| homePage | Singleton | headline, intro (rich text), heroImages, ctaButtons | 2 |
| storyMilestone | Document | title, date, place, body (rich text), photos, order | 2 |
| event | Document | name, start, end, venue (ref), dressCode, description, audience (everyone or wedding party), order | 2 |
| venue | Document | name, address, location (geopoint), mapsUrl, parkingNotes, accessibilityNotes, photos | 2 |
| accommodation | Document | hotelName, bookingUrl, blockCode, rateNote, bookingDeadline, distanceToVenue, isRoomBlock | 4 |
| travelInfo | Singleton | airports, driving, train, rideshare (rich text each) | 4 |
| faq | Document | question, answer (rich text), category, order | 4 |
| partyMember | Document | name, role, side, photo, intro, order | 4 |
| galleryAlbum | Document | title, images (image, alt, caption), published | 4 |

- **Translation:** model every guest-facing text field as a localized field (English plus Spanish) from day one, even if Spanish ships later, so there is no migration.
- **Images:** alt text required on every image; hotspot and crop turned on.
- **What stays out of Sanity:** the guest list and RSVP answers. Free plan datasets are public only, so anything stored there can be read by anyone who knows the project ID.
- **Venue address:** entered in the venue document from the signed contract.

## Architecture

- **App:** Next.js (App Router, TypeScript), Tailwind CSS and shadcn/ui, started from Sanity's Clean Next.js + Sanity app, in a repo on Steven's personal GitHub account. Hobby can't connect to repos owned by a GitHub organization.
- **Design system:** shadcn/ui components themed through CSS variables in one file; page sections take typed props, so a page renders the same from placeholder data or Sanity data.
- **Studio:** Sanity Studio embedded at /studio in the same Next.js app, so there is one repo and one deploy.
- **Data:** next-sanity with GROQ queries and types generated by Sanity TypeGen, so query results are typed end to end; pages render statically and are cached by tag.
- **Updates on the fly:**
  1. Edit and publish in Studio.
  2. A Sanity webhook calls a Next.js route handler that checks the webhook secret.
  3. The handler calls revalidateTag for what changed.
  4. Guests see the change on their next load, with no redeploy.
- **Live preview (optional):** draft mode plus Sanity's Presentation tool, so we see edits on the real page before publishing.
- **Images:** served from Sanity's image CDN with width and format set in the URL, not from Next.js image optimization, because Hobby includes only 5,000 image transformations a month.
- **Search engines:** a site-wide noindex tag and X-Robots-Tag header while allowSearchIndexing is off.
- **Deploys:** every branch push gets a Vercel preview URL; main deploys to production.

## Free tier fit

| Service | Free allowance per month (as listed today) | Our expected use |
| --- | --- | --- |
| [Vercel Hobby](https://vercel.com/docs/plans/hobby) | 100 GB data transfer, 1M CDN requests, 1M function invocations, 5,000 image transformations; 50 domains per project; personal, non-commercial use only | A small fraction; a wedding site is personal use |
| [Sanity Free](https://www.sanity.io/pricing) | 20 seats, 2 public datasets, 10k documents, 250k API requests, 1M API CDN requests, 100 GB assets, 100 GB bandwidth | Under 200 documents and a few thousand requests |

Neither free plan bills for overage, so a traffic spike can't create a surprise charge.

## Domain and DNS

We register the domain with Cloudflare Registrar, but only once we have a working site we've approved. Until then the site runs on its vercel.app address, which is enough to build and review it.

| Registrar | .com first year | .com renewal | Note |
| --- | --- | --- | --- |
| Cloudflare Registrar | $10.46 | $10.46 | Sold at cost; DNS must stay on Cloudflare |
| Porkbun | $11.08 | $11.08 | Free WHOIS privacy |
| Namecheap | $11.48 | $18.68 | Renewal jumps after year one |

Prices from [CostGoat](https://costgoat.com/compare/domains/com), checked October 20, 2026. The .com wholesale price rose on November 1, 2026, which puts at-cost .com near $11.17 now. Other endings like .wedding usually cost more; price them before choosing. Plan for about three years (through late 2028 so wedding photos stay up), roughly $35 in total.

1. Shortlist names (for example our first names, with or without "wedding") and check availability.
2. Buy at Cloudflare Registrar; turn on auto-renew.
3. In the Vercel project, add the apex domain and www under Domains; redirect one to the other.
4. Add the DNS records Vercel shows (A record for the apex, CNAME for www) at the registrar. On Cloudflare, set them to DNS only, not proxied.
5. Vercel issues and renews the SSL certificate automatically once DNS resolves.

## Privacy

- Launch with a site-wide noindex so search engines skip the site; a guest password is a later decision (see Later).
- Never put the guest list, home addresses or RSVP answers on a page or in Sanity.

## Phases and timeline

| Phase | Window | Scope | Done when |
| --- | --- | --- | --- |
| 0. Set up | Nov to Dec 2026 | Repo created from Sanity's Clean Next.js + Sanity app, shadcn/ui added; Sanity project with Studio at /studio; Vercel project linked to GitHub | A placeholder page deploys from main and Studio loads at /studio |
| 1. Design | Dec 2026 to Jan 2027 | Set the Waterfront classic theme variables and fonts, add the shadcn components we need, compose Home, Our Story and Event details with placeholder content; optional Magic UI or Aceternity hero | We both sign off on it on a phone and a laptop |
| 2. Hook up Sanity | Jan to Feb 2027 | Schemas for the phase 1 pages (extending the starter's), GROQ queries and TypeGen, placeholders swapped for Sanity content, webhook revalidation, optional live preview | Michelle edits a line in Studio on her phone and sees it live within a minute |
| 3. Approve, then add our domain | Feb to Mar 2027 | Approve the site on its vercel.app address, then buy the domain at Cloudflare, point DNS, SSL, noindex on, Lighthouse pass | The domain loads over HTTPS with real content |
| 4. More pages | Spring to summer 2027 | Travel and stay, FAQ, Schedule, Wedding party, Gallery, share image | The site is ready to go on the save-the-dates |

Save-the-dates commonly go out 8 to 12 months ahead (August to December 2027), so phase 4 has room; that is a common range, so we set our own date. The hotel block details for Travel and stay come from the Land's End room block call due by December 18, 2026. Integrations start only after phase 3 (see Later).

## Risks

- **Design drags on:** timebox phase 1; pick one direction and refine it on the real site, not in endless mockups.
- **Image limits:** Vercel's 5,000 monthly image transformations could run out on a big gallery; serving images from Sanity's CDN avoids it.
- **Public dataset:** a careless field could expose private data; keep guest data out of Sanity entirely.
- **Domain lapse:** auto-renew on, with a card that won't expire before 2029.

## Open decisions

- [ ] Domain name and ending (.com or other). Registrar is Cloudflare; we pick the name after the site is approved, so it doesn't block the build.
- [ ] When engagement photos happen, for Home, Our Story and the Gallery.
- [ ] Who besides us gets Studio access.

## Later (out of scope for now)

These wait until the foundation is live; each gets its own plan when we pick it up.

- **RSVP:** our own form or The Knot's or Zola's RSVP. If our own, where answers live (a free Postgres tier such as Neon or Supabase, or a Google Sheet written by a server route), with a honeypot field and rate limiting against spam.
- **Registry:** link-out cards to The Knot or another registry. If an old Zola site still shows a May 2027 date, take it down or fix it so guests don't see two dates.
- **Guest password:** one shared password checked by Next.js middleware, if we'd rather not be public. Vercel's own password protection is a Pro feature at $20 a month per project.
- **Spanish:** an EN/ES toggle on every page, and who translates. The content fields are already localized.
- **Analytics:** Vercel Web Analytics (50,000 events a month on Hobby) or similar.
- **Email:** a free hello@ forwarding address guests can write to.
- **Save-the-date QR code:** whether to print one.
- **Livestream, seating chart, guest messaging.**

## Sources

- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- [Vercel limits](https://vercel.com/docs/limits)
- [Sanity pricing](https://www.sanity.io/pricing)
- [CostGoat .com registrar prices](https://costgoat.com/compare/domains/com)
