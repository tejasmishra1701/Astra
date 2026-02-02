import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-mono font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-terminal-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-accent-primary text-terminal-bg shadow-neon-yellow hover:shadow-glow-sm hover:scale-[1.02] hover:brightness-110",
        secondary:
          "bg-accent-secondary text-white shadow-neon-ens hover:shadow-neon-ens hover:scale-[1.02] hover:brightness-110",
        ghost:
          "bg-transparent text-terminal-text hover:bg-terminal-panel border border-terminal-border hover:border-accent-primary hover:text-accent-primary",
        success:
          "bg-accent-success text-white hover:brightness-110 hover:scale-[1.02]",
        error:
          "bg-accent-error text-white hover:brightness-110 hover:scale-[1.02]",
        outline:
          "border-2 border-accent-primary/50 bg-transparent text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary",
        yellow:
          "bg-gradient-to-r from-yellow-400 to-yellow-500 text-terminal-bg shadow-neon-yellow hover:shadow-glow-sm hover:scale-[1.02]",
        ens: "bg-gradient-to-r from-ens-400 to-ens-600 text-white shadow-neon-ens hover:shadow-neon-ens hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
