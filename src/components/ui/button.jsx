import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-primary text-white shadow hover:bg-primary/90",
  destructive: "bg-red-600 text-white shadow-sm hover:bg-red-600/90",
  outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900",
  secondary: "bg-secondary text-white shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-gray-100 hover:text-gray-900",
  link: "text-primary underline-offset-4 hover:underline",
  gradient: "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg transition-shadow",
};

const sizeVariants = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variantClass = buttonVariants[variant] || buttonVariants.default;
  const sizeClass = sizeVariants[size] || sizeVariants.default;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClass,
        sizeClass,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };