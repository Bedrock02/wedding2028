import {defineArrayMember, defineField, defineType} from 'sanity'

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized rich text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'es',
      title: 'Spanish',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})
