import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "secondary";
}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  const variants = {
    success: "bg-tertiary/10 text-tertiary border-tertiary/20",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    error: "bg-error-container text-error border-error/20",
    info: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    neutral: "bg-surface-container-high text-on-surface-variant border-outline-variant",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold uppercase tracking-wider border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
