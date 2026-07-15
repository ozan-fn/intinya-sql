import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./hono";

const port = parseInt(process.env.BACKEND_PORT || "3001", 10);
const host = process.env.BACKEND_HOST || "localhost";

serve({
  fetch: app.fetch,
  port,
  hostname: host,
});

console.log(`API running at http://${host}:${port}`);