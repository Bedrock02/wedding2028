import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Site-wide settings. Phase 0 holds only the couple's names so the Studio has
 * something to edit; the full field list arrives in phase 2.
 */
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
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
