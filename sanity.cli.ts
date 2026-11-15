import {defineCliConfig} from 'sanity/cli'

import {dataset, projectId} from './sanity/lib/api'

export default defineCliConfig({
  api: {projectId, dataset},
  typegen: {
    path: './{app,components,sanity}/**/*.{ts,tsx}',
    schema: './sanity.schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
