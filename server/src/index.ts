import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./hono.js";

const port = parseInt(process.env.PORT || "3001", 10);
const host = "127.0.0.1";

serve({
  fetch: app.fetch,
  port,
  hostname: host,
});

console.log(`API running at http://${host}:${port}`);