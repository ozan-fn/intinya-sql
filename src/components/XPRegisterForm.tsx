import { useState } from "react";
import { XPInput } from "./XPInput";
import { XPButton } from "./XPButton";

import googleLogo from "@/assets/icons/google.svg";
import discordLogo from "@/assets/icons/discord.svg";

interface XPRegisterFormProps {
  onSubmit?: (username: string, password: string) => void;
}

export function XPRegisterForm({ onSubmit }: XPRegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    onSubmit?.(username, password);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <XPInput
          label="Username:"
          id="register-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
        />

        <XPInput
          label="Password:"
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        <XPInput
          label="Confirm Password:"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        {/* Error message */}
        {error && (
          <div
            className="text-xs text-red-700 bg-red-100 border border-red-400 px-2 py-1 rounded"
            style={{ fontFamily: "'Segoe UI', sans-serif" }}
          >
            {error}
          </div>
        )}

        <XPButton type="submit" fullWidth disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </XPButton>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#7f9db9]"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span
            className="px-2 text-black"
            style={{
              background: "var(--xp-face)",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            or
          </span>
        </div>
      </div>

      {/* OAuth buttons */}
      <div className="flex gap-4 w-fit mx-auto">
        <XPButton
          type="button"
          variant="icon"
          icon={<img src={googleLogo} alt="Google" className="w-6 h-6" />}
          disabled={isLoading}
          title="Sign up with Google"
        />

        <XPButton
          type="button"
          variant="icon"
          icon={<img src={discordLogo} alt="Discord" className="w-6 h-6" />}
          disabled={isLoading}
          title="Sign up with Discord"
        />
      </div>
    </div>
  );
}
