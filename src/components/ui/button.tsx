import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-100 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 active:not-aria-[haspopup]:scale-[0.98] active:opacity-75 disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:opacity-90 active:opacity-75",
        outline:
          "border-primary text-primary hover:bg-primary/10 active:bg-primary/20 aria-expanded:bg-primary/10",
        secondary:
          "bg-primary/15 text-primary hover:bg-primary/20 active:bg-primary/25 aria-expanded:bg-primary/20 dark:bg-primary/20",
        ghost:
          "text-primary hover:bg-black/5 dark:hover:bg-white/10 active:bg-primary/15 aria-expanded:bg-black/5 dark:aria-expanded:bg-white/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90 active:opacity-75 focus-visible:ring-destructive/30",
        navy: "bg-navy text-navy-foreground hover:opacity-90 active:opacity-75",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 text-[15px] has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-[13px] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        lg: "h-12 gap-2 px-6 text-[17px] font-semibold has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-10 active:not-aria-[haspopup]:scale-95",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
