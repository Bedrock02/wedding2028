import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'siteLink',
  title: 'Page link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({
      name: 'href',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Home', value: '/'},
          {title: 'Our Story', value: '/our-story'},
          {title: 'Event Details', value: '/event-details'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label.en', subtitle: 'href'},
  },
})
