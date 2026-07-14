import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import XPTaskbar from "#/components/XPTaskbar";
import XPStartMenu from "#/components/XPStartMenu";
import BlissBackground from "@/assets/images/BlissBetter.jpg";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [, setStartMenuOpen] = useState(false);
  const [, setWindowFocused] = useState(true);

  return (
    <main
      className="relative w-full min-h-screen overflow-hidden select-none cursor-default bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BlissBackground})`,
        fontFamily: "'Segoe UI', sans-serif",
      }}
      onClick={() => {
        setStartMenuOpen(false);
        setWindowFocused(true);
      }}
    >
      {/* Desktop icons */}
      <div className="absolute top-6 left-4 flex flex-col gap-6 z-0">
        {[
          { label: "New_Query.sql", color: "#F5D547" },
          { label: "Schema.db", color: "#5B9BD5" },
          { label: "Readme.txt", color: "#ECE9D8" },
        ].map((icon) => (
          <div
            key={icon.label}
            className="flex flex-col items-center w-20 group cursor-pointer"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" className="mb-1">
              <rect
                x="4"
                y="2"
                width="24"
                height="28"
                fill={icon.color}
                stroke="#000"
                strokeWidth="1"
              />
              <rect
                x="4"
                y="2"
                width="24"
                height="6"
                fill="#000"
                opacity="0.15"
              />
              <rect
                x="8"
                y="12"
                width="16"
                height="2"
                fill="#000"
                opacity="0.3"
              />
              <rect
                x="8"
                y="17"
                width="16"
                height="2"
                fill="#000"
                opacity="0.3"
              />
              <rect
                x="8"
                y="22"
                width="10"
                height="2"
                fill="#000"
                opacity="0.3"
              />
            </svg>
            <span
              className="text-xs text-white text-center leading-tight px-1"
              style={{
                textShadow:
                  "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
              }}
            >
              {icon.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main window */}
      <XPStartMenu />
      
      

      {/* Taskbar */}
      <XPTaskbar />
    </main>
  );
}
