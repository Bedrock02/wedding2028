import {defineField, defineType} from 'sanity'

export const storyMilestone = defineType({
  name: 'storyMilestone',
  title: 'Story milestone',
  type: 'document',
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  fields: [
    defineField({name: 'title', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'date', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'place', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'localeBlockContent', validation: (rule) => rule.required()}),
    defineField({name: 'photo', type: 'imageWithAlt', validation: (rule) => rule.required()}),
    defineField({name: 'order', type: 'number', validation: (rule) => rule.required().integer()}),
  ],
  preview: {select: {title: 'title.en', subtitle: 'date.en', media: 'photo'}},
})
