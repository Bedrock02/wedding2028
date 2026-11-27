import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  fields: [
    defineField({name: 'name', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'start', type: 'datetime'}),
    defineField({name: 'end', type: 'datetime'}),
    defineField({name: 'venue', type: 'reference', to: [{type: 'venue'}]}),
    defineField({name: 'dressCode', type: 'localeString'}),
    defineField({name: 'description', type: 'localeText'}),
    defineField({
      name: 'audience',
      type: 'string',
      initialValue: 'everyone',
      options: {list: [{title: 'Everyone', value: 'everyone'}, {title: 'Wedding party', value: 'weddingParty'}]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'order', type: 'number', validation: (rule) => rule.required().integer()}),
  ],
  preview: {select: {title: 'name.en', subtitle: 'start'}},
})
