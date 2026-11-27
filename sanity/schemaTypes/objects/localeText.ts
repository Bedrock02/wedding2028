import {defineField, defineType} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'es', title: 'Spanish', type: 'text', rows: 4}),
  ],
})
