import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false)

  if (type === "password") {
    return (
      <div className="relative flex w-full items-center">
        <input
          type={showPassword ? "text" : "password"}
          data-slot="input"
          className={cn(
            "h-11 w-full min-w-0 rounded-xl border border-input bg-card px-4 pr-11 py-2 text-base transition-[color,box-shadow,border-color] duration-150 outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-[15px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            className
          )}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={props.disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 flex size-5 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-40"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-input bg-card px-4 py-2 text-base transition-[color,box-shadow,border-color] duration-150 outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-[15px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
