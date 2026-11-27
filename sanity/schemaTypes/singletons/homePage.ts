import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({name: 'headline', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'intro', type: 'localeBlockContent', validation: (rule) => rule.required()}),
    defineField({name: 'heroImage', type: 'imageWithAlt', validation: (rule) => rule.required()}),
    defineField({name: 'ctaButtons', type: 'array', of: [{type: 'siteLink'}]}),
    defineField({name: 'countdownLabel', type: 'localeString'}),
    defineField({name: 'countdownHeading', type: 'localeString'}),
    defineField({name: 'countdownDoneMessage', type: 'localeString'}),
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})
