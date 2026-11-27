import {defineField, defineType} from 'sanity'

export const storyPage = defineType({
  name: 'storyPage',
  title: 'Our Story page',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'notesHeading', type: 'localeString'}),
    defineField({
      name: 'notes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'from', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'localeBlockContent', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'from'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Our Story page'})},
})
