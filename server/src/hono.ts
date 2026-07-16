import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";

export const app = new Hono();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
  "*",
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.json({
    message: "Hello Hono!",
  });
});

app.get("/api/health", (c) => {
  return c.json({
    success: true,
  });
});