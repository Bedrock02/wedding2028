import {defineField, defineType} from 'sanity'

export const eventDetailsPage = defineType({
  name: 'eventDetailsPage',
  title: 'Event details page',
  type: 'document',
  fields: [defineField({name: 'title', type: 'localeString', validation: (rule) => rule.required()})],
  preview: {prepare: () => ({title: 'Event details page'})},
})
