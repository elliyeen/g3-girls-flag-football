import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-8 px-3 rounded-md bg-raised border border-border text-primary text-[13px]",
        "placeholder:text-muted focus:outline-none focus:border-ember transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
