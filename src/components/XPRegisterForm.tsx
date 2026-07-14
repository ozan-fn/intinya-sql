import { useState } from "react";
import { XPInput } from "./XPInput";
import { XPButton } from "./XPButton";

interface XPRegisterFormProps {
  onSubmit?: (username: string, password: string) => void;
}

export function XPRegisterForm({ onSubmit }: XPRegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    onSubmit?.(username, password);
  };

  const handleOAuthRegister = (provider: string) => {
    console.log(`Register with ${provider}`);
    // TODO: Implement OAuth register
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
          required
        />

        <XPInput
          label="Password:"
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <XPInput
          label="Confirm Password:"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <XPButton type="submit" fullWidth>
          Register
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
      <div className="space-y-2">
        <XPButton
          type="button"
          onClick={() => handleOAuthRegister("Google")}
          fullWidth
        >
          Register with Google
        </XPButton>

        <XPButton
          type="button"
          onClick={() => handleOAuthRegister("Discord")}
          fullWidth
        >
          Register with Discord
        </XPButton>
      </div>
    </div>
  );
}
