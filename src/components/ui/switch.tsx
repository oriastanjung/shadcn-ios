"use client"

import * as React from "react"
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 border border-transparent transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 aria-invalid:border-destructive data-[size=default]:h-7 data-[size=default]:w-12 data-[size=sm]:h-5.5 data-[size=sm]:w-9.5 data-checked:bg-primary data-unchecked:bg-black/15 dark:data-unchecked:bg-white/20 data-disabled:cursor-not-allowed data-disabled:opacity-40",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-white shadow-ios-thumb transition-transform duration-200 group-data-[size=default]/switch:size-6 group-data-[size=sm]/switch:size-4.5 data-checked:group-data-[size=default]/switch:translate-x-5 data-checked:group-data-[size=sm]/switch:translate-x-4 data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
