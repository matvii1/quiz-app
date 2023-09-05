import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

const titleVariants = cva(
  "text-2xl font-bold text-secondary-foreground tracking-tighter",
  {
    variants: {
      size: {
        xs: "text-md",
        sm: "text-xl",
        default: "text-2xl",
        lg: "text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  asChild?: boolean
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3"

    return (
      <Comp
        className={cn(titleVariants({ size, className }))}
        {...props}
        ref={ref}
      />
    )
  },
)

Title.displayName = "Title"

export { Title }
