"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CtaButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
> & {
  as?: "button" | "a";
  href?: string;
  variant?: "primary" | "secondary" | "tertiary" | "pill";
  size?: "md" | "lg";
  target?: string;
  rel?: string;
};

const variantClasses: Record<NonNullable<CtaButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-active active:bg-primary-active disabled:bg-primary-disabled",
  secondary:
    "bg-canvas text-ink border border-ink hover:bg-surface-soft",
  tertiary:
    "bg-transparent text-ink underline-offset-4 hover:underline px-0 h-auto",
  pill: "bg-primary text-on-primary rounded-full hover:bg-primary-active px-5 py-2.5 h-auto text-sm",
};

export const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  (
    { as = "button", href, variant = "primary", size = "md", className, children, ...props },
    ref
  ) => {
    const base = cn(
      "inline-flex items-center justify-center gap-2 rounded-sm font-heading font-medium",
      "transition-colors duration-200 cursor-pointer select-none",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
      "disabled:cursor-not-allowed disabled:pointer-events-none",
      variant !== "tertiary" && variant !== "pill" && (size === "lg" ? "h-14 px-8 text-base" : "h-12 px-6 text-base"),
      variantClasses[variant],
      className
    );

    const tap = { scale: variant === "tertiary" ? 1 : 0.97 };
    const hover = { scale: variant === "tertiary" ? 1 : 1.02 };

    if (as === "a" && href) {
      return (
        <motion.a
          href={href}
          className={base}
          target={props.target}
          rel={props.rel}
          whileHover={hover}
          whileTap={tap}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={base}
        whileHover={hover}
        whileTap={tap}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

CtaButton.displayName = "CtaButton";
