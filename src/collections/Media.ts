import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  admin: {
    group: 'System',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'logo',
        width: 240,
        height: 80,
        position: 'centre',
      },
      {
        name: 'logoLarge',
        width: 480,
        height: 160,
        position: 'centre',
      },
      {
        name: 'favicon',
        width: 256,
        height: 256,
        position: 'centre',
      },
      {
        name: 'heroProduct',
        width: 1200,
        height: 800,
        position: 'centre',
      },
      {
        name: 'featureScreenshot',
        width: 900,
        height: 600,
        position: 'centre',
      },
      {
        name: 'blogThumbnail',
        width: 800,
        height: 450,
        position: 'centre',
      },
      {
        name: 'blogFeatured',
        width: 1280,
        height: 720,
        position: 'centre',
      },
      {
        name: 'ogImage',
        width: 1200,
        height: 630,
        position: 'centre',
      },
      {
        name: 'avatar',
        width: 200,
        height: 200,
        position: 'centre',
      },
      {
        name: 'icon',
        width: 96,
        height: 96,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
}
