import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateLegalPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating legal-page')
    revalidateTag('global_legal-page')
  }

  return doc
}
