import React from 'react'
import RichText from '@/components/RichText'
import type { DocPage } from '@/payload-types'

interface DocsContentProps {
  body: DocPage['body']
}

export function DocsContent({ body }: DocsContentProps): React.ReactElement {
  return (
    <div className="docs-richtext">
      <RichText data={body} enableGutter={false} enableProse={false} />
    </div>
  )
}
