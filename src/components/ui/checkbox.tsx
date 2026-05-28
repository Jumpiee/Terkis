'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utilities/cn'

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-none border border-neutral-300 bg-white transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-red-900 data-[state=checked]:border-red-900 data-[state=checked]:text-white focus-visible:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:data-[state=checked]:bg-red-400 dark:data-[state=checked]:border-red-400 dark:focus-visible:border-neutral-100',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
