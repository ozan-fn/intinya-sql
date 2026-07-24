import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import XPTaskbar from "src/components/XPStartbar";
import XPStartMenu from "src/components/XPPrequisiteForm";
import BlissBackground from "@/assets/images/BlissBetter.jpg";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [, setStartMenuOpen] = useState(false);
  const [, setWindowFocused] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error("Failed to check auth:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

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

      {/* Main window - Only show if not logged in */}
      {!isLoading && !isLoggedIn && <XPStartMenu />}

      {/* Taskbar */}
      <XPTaskbar />
    </main>
  );
}
