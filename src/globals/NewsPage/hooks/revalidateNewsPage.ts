import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateNewsPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating news-page')
    revalidateTag('global_news-page')
  }

  return doc
}
