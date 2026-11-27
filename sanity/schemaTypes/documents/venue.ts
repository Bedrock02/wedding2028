import {defineField, defineType} from 'sanity'

export const venue = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'address', type: 'localeText', validation: (rule) => rule.required()}),
    defineField({name: 'location', type: 'geopoint'}),
    defineField({name: 'mapsUrl', type: 'url', validation: (rule) => rule.required()}),
    defineField({name: 'parkingNotes', type: 'localeText'}),
    defineField({name: 'accessibilityNotes', type: 'localeText'}),
    defineField({name: 'photo', type: 'imageWithAlt'}),
  ],
  preview: {select: {title: 'name', subtitle: 'address.en', media: 'photo'}},
})
