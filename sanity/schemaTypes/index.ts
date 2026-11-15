import {siteSettings} from './singletons/siteSettings'

export const schemaTypes = [siteSettings]

/** Types with exactly one document, edited from a fixed entry in the Studio. */
export const singletonTypes = new Set(['siteSettings'])
