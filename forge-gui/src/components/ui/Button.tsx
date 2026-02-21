import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?:    "sm" | "md";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", size = "md", loading, children, className, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember disabled:opacity-40 disabled:pointer-events-none cursor-default";
    const variants = {
      primary: "bg-ember text-white hover:bg-ember-light",
      ghost:   "text-subtle hover:text-primary hover:bg-raised",
      danger:  "text-crimson hover:bg-crimson/10",
      outline: "border border-border text-primary hover:bg-raised",
    };
    const sizes = {
      sm: "h-7 px-3 text-[12px]",
      md: "h-8 px-4 text-[13px]",
    };
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="size-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
