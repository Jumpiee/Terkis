'use client'

import React from 'react'
import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxUi> {
  label?: string
  id: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className, ...props }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <CheckboxUi id={id} {...props} />
      {label && (
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  )
}
