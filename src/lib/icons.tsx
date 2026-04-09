import * as Icons from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'

interface DynamicIconProps extends LucideProps {
  name: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps): React.ReactElement {
  const IconComponent = (Icons as unknown as Record<string, LucideIcon>)[name]

  if (!IconComponent) {
    return <Icons.HelpCircle {...props} />
  }

  return <IconComponent {...props} />
}
