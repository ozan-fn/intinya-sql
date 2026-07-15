import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dash } from "@better-auth/infra";

import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
  },

  baseURL: import.meta.env.BETTER_AUTH_URL!,
  secret: import.meta.env.BETTER_AUTH_SECRET!,

  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [dash()],
});
