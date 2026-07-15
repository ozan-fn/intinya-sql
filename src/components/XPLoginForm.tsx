import { useState } from "react";
import { XPInput } from "./XPInput";
import { XPButton } from "./XPButton";
import googleLogo from "@/assets/icons/google.svg";
import discordLogo from "@/assets/icons/discord.svg";

interface XPLoginFormProps {
  onSubmit?: (username: string, password: string) => void;
}

export function XPLoginForm({ onSubmit }: XPLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(username, password);
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement OAuth login
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <XPInput
          label="Username:"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <XPInput
          label="Password:"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <XPButton type="submit" fullWidth>
          Login
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
          fullWidth
          icon={<img src={googleLogo} alt="Google" className="w-6 h-6" />}
          onClick={() => handleOAuthLogin("Google")}
        />

        <XPButton
          type="button"
          variant="icon"
          fullWidth
          icon={<img src={discordLogo} alt="Discord" className="w-6 h-6" />}
          onClick={() => handleOAuthLogin("Discord")}
        />
      </div>
    </div>
  );
}
