import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'coupleNames',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'weddingDateTime', type: 'datetime', validation: (rule) => rule.required()}),
    defineField({name: 'city', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'venue', type: 'reference', to: [{type: 'venue'}]}),
    defineField({name: 'hashtag', type: 'string'}),
    defineField({name: 'navItems', type: 'array', of: [{type: 'siteLink'}]}),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'allowSearchIndexing',
      type: 'boolean',
      initialValue: false,
      description: 'Keep disabled until the site has been approved for public launch.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
