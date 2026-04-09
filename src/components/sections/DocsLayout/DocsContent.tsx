import React from 'react'
import { Info, AlertTriangle } from 'lucide-react'
import { slugifyHeading, type DocsBlock } from '../_docs/docsData'

function renderBlock(block: DocsBlock, index: number): React.ReactElement {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-5 font-body text-base leading-[1.8] text-body">
          {block.text}
        </p>
      )

    case 'h2':
      return (
        <h2
          key={index}
          id={slugifyHeading(block.text)}
          className="mb-4 mt-10 font-heading text-[22px] font-bold text-dark scroll-mt-24"
        >
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3
          key={index}
          id={slugifyHeading(block.text)}
          className="mb-3 mt-8 font-heading text-[17px] font-semibold text-dark scroll-mt-24"
        >
          {block.text}
        </h3>
      )

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag
          key={index}
          className={`my-4 space-y-2 pl-5 font-body text-base text-body ${
            block.ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {block.items.map((item) => (
            <li key={item} className="leading-[1.7]">
              {item}
            </li>
          ))}
        </Tag>
      )
    }

    case 'code':
      return (
        <div key={index} className="relative my-6 overflow-hidden rounded-xl bg-dark">
          {block.language && (
            <span className="absolute right-4 top-3 font-mono text-xs text-muted">
              {block.language}
            </span>
          )}
          <pre className="overflow-x-auto p-5">
            <code className="font-mono text-sm leading-[1.6] text-light">
              {block.code}
            </code>
          </pre>
        </div>
      )

    case 'callout': {
      const isWarning = block.variant === 'warning'
      return (
        <div
          key={index}
          className={`my-6 flex gap-3 rounded-lg border-l-4 p-4 ${
            isWarning
              ? 'border-warning bg-warning/10'
              : 'border-primary bg-light/50'
          }`}
        >
          {isWarning ? (
            <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-warning" />
          ) : (
            <Info size={20} className="mt-0.5 flex-shrink-0 text-primary" />
          )}
          <p className="font-body text-[15px] leading-[1.7] text-body">
            {block.text}
          </p>
        </div>
      )
    }
  }
}

export function DocsContent({ body }: { body: DocsBlock[] }): React.ReactElement {
  return <div>{body.map((block, i) => renderBlock(block, i))}</div>
}
