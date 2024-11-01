import type { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex items-center justify-center rounded-xl',

  variants: {
    variant: {
      default: 'bg-blue400 text-white hover:bg-blue200 hover:text-black',
      danger: 'bg-red500 text-white'
    },
    size: {
      default: 'w-full py-4 text-3xl',
      fit: 'w-fit py-4 px-7 text-3xl self-center',
      small: 'py-2.5 px-5 text-lg',
    },
    weight: {
      default: 'font-normal',
      semibold: 'font-semibold'
    }
  },

  defaultVariants: {
    variant: 'default',
    size: 'default',
    weight: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export const Button = ({
  children,
  variant,
  size,
  weight,
  ...props
}: ButtonProps) => {
  return (
    <>
      <button {...props} className={buttonVariants({ variant, size, weight })}>
        {children}  
      </button>    
    </>
  )
}