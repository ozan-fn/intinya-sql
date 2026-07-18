import { Hono } from "hono";
import type { Context } from "hono";
import { createUsersRouter } from "./users.js";

export const createApiRouter = () => {
  const api = new Hono();

  // Health check
  api.get("/health", (c: Context) => {
    return c.json({ success: true, timestamp: new Date().toISOString() });
  });

  // Mount users routes
  api.route("/users", createUsersRouter());

  return api;
};
