import React from "react";

interface XPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export function XPInput({ label, id, className = "", ...props }: XPInputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold mb-1 text-black"
          style={{ fontFamily: "'Segoe UI', sans-serif" }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-2 py-1 text-sm border border-[#7f9db9] text-black ${className}`}
        style={{
          background: "white",
          fontFamily: "'Segoe UI', sans-serif",
          boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
        }}
        {...props}
      />
    </div>
  );
}
