import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

console.log("baseURL", baseURL);

export const authClient = createAuthClient({
  baseURL: baseURL,
});
