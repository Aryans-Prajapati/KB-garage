"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded";

    const variants = {
      primary:
        "gold-btn-shine text-on-secondary shadow-sm hover:shadow-md transition-shadow",
      secondary:
        "bg-primary-container text-on-primary hover:bg-primary border border-outline/30 hover:border-secondary shadow-sm",
      outline:
        "bg-transparent border border-primary text-primary hover:bg-surface-container-low hover:text-secondary",
      ghost:
        "bg-transparent text-on-surface-variant hover:text-secondary hover:bg-surface-container-low",
      dark:
        "bg-primary hover:bg-primary-container text-on-primary shadow-md hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
