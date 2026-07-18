import { useState } from "react";
import { XPWindowControls } from "./XPWindowsControls";
import { XPErrorDialog } from "./XPErrorDialog";
import { XPLoginForm } from "./XPLoginForm";
import { XPRegisterForm } from "./XPRegisterForm";
import { authClient } from "@/lib/auth-client";
import { XPButton } from "./XPButton";

type ViewType = "menu" | "login" | "register";

export default function XPStartMenu() {
  const [windowFocused] = useState(true);
  const [errorDialog, setErrorDialog] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("menu");

  const handleLogin = async (username: string, password: string) => {
    try {
      await authClient.signIn.email({
        email: username,
        password: password,
      });
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      await authClient.signUp.email({
        email: username,
        password: password,
        name: username,
      });
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleBack = () => {
    setCurrentView("menu");
  };

  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md border border-black shadow-[inset_1px_1px_0_var(--xp-highlight),inset_-1px_-1px_0_var(--xp-shadow-dark),2px_2px_6px_rgba(0,0,0,0.4)]"
        style={{ background: "var(--xp-face)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Titlebar */}
        <div
          className={`flex items-center justify-between px-1 py-1 border-b border-black`}
          style={{ background: windowFocused ? "var(--xp-navy)" : "#7A96DF" }}
        >
          <div className="flex items-center gap-1.5 pl-1">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect
                width="16"
                height="16"
                fill="#F5D547"
                stroke="#000"
                strokeWidth="0.5"
              />
              <rect
                x="2"
                y="4"
                width="12"
                height="2"
                fill="#000"
                opacity="0.4"
              />
              <rect
                x="2"
                y="8"
                width="12"
                height="2"
                fill="#000"
                opacity="0.4"
              />
            </svg>
            <span
              className="text-white text-sm font-bold"
              style={{ fontFamily: "'Segoe UI', sans-serif" }}
            >
              AnomalySQL.exe — {currentView === "menu" ? "Welcome" : currentView === "login" ? "Login" : "Register"}
            </span>
          </div>
          <XPWindowControls onClose={() => setErrorDialog(true)} />
        </div>

        {/* Menu bar */}
        <div
          className="flex gap-4 px-3 py-1 text-xs border-b"
          style={{
            background: "var(--xp-face)",
            borderColor: "var(--xp-shadow)",
          }}
        >
          {["File", "Edit", "View", "Query", "Help"].map((m) => (
            <span
              key={m}
              className="cursor-pointer text-black hover:text-white"
              style={{
                fontFamily: "'Segoe UI', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--xp-navy)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#000";
              }}
            >
              {m}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="px-6 py-6 flex flex-col items-center"
          style={{ background: "var(--xp-face)" }}
        >
          <h1
            className="text-4xl text-center mb-1 font-bold tracking-wide"
            style={{
              color: "var(--xp-navy)",
              fontFamily: "'Tahoma', 'Press Start 2P', monospace",
            }}
          >
            AnomalySQL
          </h1>
          <p
            className="text-xs text-center mb-6"
            style={{ color: "#333", fontFamily: "'Segoe UI', sans-serif" }}
          >
            Master Your Database Skills
          </p>

          {/* Content based on view */}
          <div className="w-full">
            {currentView === "menu" && (
              <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                <XPButton
                  onClick={() => setCurrentView("login")}
                  fullWidth
                >
                  Login
                </XPButton>
                <XPButton
                  onClick={() => setCurrentView("register")}
                  fullWidth
                >
                  Register
                </XPButton>
              </div>
            )}

            {currentView === "login" && (
              <>
                <XPLoginForm onSubmit={handleLogin} />
                <div className="mt-4 text-center">
                  <button
                    onClick={handleBack}
                    className="text-xs text-blue-700 hover:underline"
                    style={{ fontFamily: "'Segoe UI', sans-serif" }}
                  >
                    ← Back to menu
                  </button>
                </div>
              </>
            )}

            {currentView === "register" && (
              <>
                <XPRegisterForm onSubmit={handleRegister} />
                <div className="mt-4 text-center">
                  <button
                    onClick={handleBack}
                    className="text-xs text-blue-700 hover:underline"
                    style={{ fontFamily: "'Segoe UI', sans-serif" }}
                  >
                    ← Back to menu
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-3 py-1 text-xs border-t text-black"
          style={{
            background: "var(--xp-face)",
            borderColor: "var(--xp-shadow)",
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          <span>Version 1.0.0</span>
          <span
            style={{ fontFamily: "'Courier New', ui-monospace, monospace" }}
          >
            {currentView === "menu" ? "Select an option" : "Fill the form"}
          </span>
        </div>
      </div>

      {/* Error dialog easter egg */}
      <XPErrorDialog
        isOpen={errorDialog}
        onClose={() => setErrorDialog(false)}
        title="AnomalySQL.exe"
        message="Anomaly Detected: AnomalySQL.exe cannot be closed while a session is active."
        icon="error"
      />
    </>
  );
}
