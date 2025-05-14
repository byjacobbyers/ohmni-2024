'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { deskStructure } from '@/sanity/structure'
import OhmniIcon from '@/components/logo'
import { resolve } from '@/sanity/presentation/resolve'
import previewAction from '@/sanity/presentation/preview-action';
import { defaultDocumentNode } from '@/sanity/lib/defaultDocumentNode'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import schemas from '@/sanity/schemas'
import { presentationTool } from 'sanity/presentation'
import {muxInput} from 'sanity-plugin-mux-input'



export default defineConfig({
  basePath: '/studio',
  title: 'Ohmni',
  projectId,
  dataset,
  icon: OhmniIcon,
  scheduledPublishing: {
		enabled: false,
	},
  tasks: {enabled: false},
  // Add and edit the content schema in the './sanity/schema' folder
  schema: { types: schemas },
  document: {
    // Use newDocumentOptions to filter out specific template IDs
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        // Filter out the `site` and `media.tag` template IDs from the create options
        return prev.filter((templateItem) => {
          // Check if templateId is available in templateItem.spec
          return !['site', 'media.tag', 'navigation'].includes(templateItem?.templateId)
        })
      }
      return prev
    },
    actions: (prev, context) => {
      if (context.schemaType === 'page') {
        return [...prev, previewAction];
      }
      return prev;
    },
  },
  plugins: [
    structureTool({
			structure: deskStructure,
      defaultDocumentNode
		}),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    media(),
    muxInput(),
    presentationTool({
      resolve,
      previewUrl: {
       // origin: 'https://ohmni.tech',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
})
