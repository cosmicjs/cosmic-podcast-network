import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/cosmic/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-teal-500 text-white hover:bg-teal-500/90",
        destructive:
          "bg-red-500 text-red-50 hover:bg-red-500/90 dark:bg-dark-red-500 dark:hover:bg-dark-red-500/90",
        outline:
          "border text-gray-700 dark:text-gray-100 border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gray-50 dark:bg-dark-gray-100 text-gray-600 dark:text-dark-gray-600 hover:bg-gray-100 dark:hover:bg-dark-gray-200",
        ghost:
          "hover:bg-gray-50 dark:hover:bg-dark-gray-50 hover:text-gray-800 dark:hover:text-dark-gray-800",
        link: "underline-offset-4 hover:underline text-blue-500-link dark:blue-500",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  renderAs?: string;
  iconRight?: React.ReactElement;
  href?: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      renderAs = "button",
      href,
      target,
      iconRight,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? "a" : renderAs;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        {...(Comp === "a" ? { href, target } : {})}
      >
        {props.children}
        {iconRight && (
          <span className="relative -top-px ml-1">{iconRight}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
