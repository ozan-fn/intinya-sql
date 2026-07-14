import React from "react";

interface XPButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  fullWidth?: boolean;
}

export function XPButton({
  children,
  variant = "default",
  fullWidth = false,
  className = "",
  ...props
}: XPButtonProps) {
  return (
    <button
      className={`${fullWidth ? "w-full" : ""} py-2 text-xs font-bold border border-black cursor-pointer shadow-[inset_1px_1px_0_var(--xp-highlight),inset_-1px_-1px_0_var(--xp-shadow),inset_2px_2px_0_#DFDFDF,inset_-2px_-2px_0_#ACA899] active:shadow-[inset_-1px_-1px_0_var(--xp-highlight),inset_1px_1px_0_var(--xp-shadow)] text-black disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        background: "var(--xp-face)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
