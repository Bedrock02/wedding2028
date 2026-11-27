import {BookIcon, CogIcon, HomeIcon, CalendarIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

import {singletonTypes} from './schemaTypes'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home page')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Our Story page')
        .icon(BookIcon)
        .child(S.document().schemaType('storyPage').documentId('storyPage')),
      S.listItem()
        .title('Event details page')
        .icon(CalendarIcon)
        .child(S.document().schemaType('eventDetailsPage').documentId('eventDetailsPage')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() ?? '')),
    ])
