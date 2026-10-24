import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-100 outline-none hover:bg-black/5 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring/40 active:opacity-75 disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-pressed:bg-primary/15 aria-pressed:text-primary dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-card text-muted-foreground shadow-soft hover:bg-muted aria-pressed:border-primary aria-pressed:bg-primary/15 aria-pressed:text-primary",
      },
      size: {
        default:
          "h-9 min-w-9 px-3.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-8 min-w-8 px-3 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-11 min-w-11 px-4 text-base has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
