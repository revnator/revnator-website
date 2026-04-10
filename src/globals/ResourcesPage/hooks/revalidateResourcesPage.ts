import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateResourcesPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating resources-page')
    revalidateTag('global_resources-page')
  }

  return doc
}
