import {defineField, defineType} from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image with alt text',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) => rule.required(),
})
