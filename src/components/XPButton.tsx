import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const xpButtonVariants = cva(
  "inline-flex items-center gap-2 border border-black text-black " +
    "shadow-[inset_1px_1px_0_var(--xp-highlight),inset_-1px_-1px_0_var(--xp-shadow),inset_2px_2px_0_#DFDFDF,inset_-2px_-2px_0_#ACA899] " +
    "active:shadow-[inset_-1px_-1px_0_var(--xp-highlight),inset_1px_1px_0_var(--xp-shadow)] " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer " +
    "font-['Segoe_UI',sans-serif] bg-[var(--xp-face)]",
  {
    variants: {
      variant: {
        default: "justify-center font-bold",
        primary: "justify-center font-bold",
        icon: "justify-center p-3",
        oauth: "justify-start p-3",
      },
      size: {
        default: "h-9 text-xs px-4",
        icon: "h-10 w-10",
        oauth: "h-10 text-sm px-3",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

export interface XPButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof xpButtonVariants> {
  icon?: React.ReactNode;
}

const defaultSizeForVariant: Record<string, "default" | "icon" | "oauth"> = {
  default: "default",
  primary: "default",
  icon: "icon",
  oauth: "oauth",
};

export const XPButton = React.forwardRef<HTMLButtonElement, XPButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      fullWidth,
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedSize = size ?? defaultSizeForVariant[variant ?? "default"];

    return (
      <button
        ref={ref}
        className={cn(
          xpButtonVariants({ variant, size: resolvedSize, fullWidth }),
          className,
        )}
        {...props}
      >
        {icon}
        {variant !== "icon" && children}
      </button>
    );
  },
);

XPButton.displayName = "XPButton";
