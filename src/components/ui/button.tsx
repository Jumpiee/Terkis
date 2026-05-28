import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utilities/cn'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center hover:cursor-pointer gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none rounded-none",
  {
    variants: {
      variant: {
        default: 'bg-red-900 text-white hover:bg-red-800',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90',
        outline:
          'border border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        ghost:
          'text-neutral-500 hover:text-red-900',
        link: 'text-red-900 underline-offset-4 hover:underline',
        nav: 'text-neutral-500 hover:text-red-900 p-0 pt-2 pb-6 tracking-widest font-mono',
      },
      size: {
        clear: '',
        default: 'h-11 px-6',
        sm: 'h-8 px-3',
        lg: 'h-12 px-8',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
