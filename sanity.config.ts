'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId, studioBasePath} from './sanity/lib/api'
import {schemaTypes, singletonTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Wedding website',
  basePath: studioBasePath,
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool({defaultApiVersion: apiVersion})],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the global "new document" menu.
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons can be edited and published, but not duplicated or deleted.
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : actions,
  },
})
