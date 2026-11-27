/**
 * Project settings shared by the Studio config, the CLI and the site.
 * The project ID and dataset name are public identifiers, not secrets.
 */
import {sanityProject} from '../project.config'

export const organizationId = sanityProject.organizationId
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || sanityProject.projectId
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || sanityProject.dataset

/** See https://www.sanity.io/docs/api-versioning */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-25'

/** Where the embedded Studio is mounted in the Next.js app. */
export const studioBasePath = '/studio'
