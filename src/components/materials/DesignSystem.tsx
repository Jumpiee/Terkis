import * as React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/cn'

export function AppButton({ className, ...props }: ButtonProps) {
  return <Button className={cn('px-5 font-semibold', className)} {...props} />
}

type AppCardProps = React.ComponentProps<'div'> & {
  title: string
  description?: string
}

export function AppCard({ className, title, description, children, ...props }: AppCardProps) {
  return (
    <Card className={cn('ds-surface gap-4 py-5', className)} {...props}>
      <CardHeader className="px-5">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="px-5">{children}</CardContent>
    </Card>
  )
}

