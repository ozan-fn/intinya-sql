import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth/auth.js";
import { errorHandler } from "./middleware/error.js";
import { createApiRouter } from "./routes/api.js";

type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

export const app = new Hono<{ Variables: Variables }>();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// CORS for Better Auth endpoints
app.use(
  "/api/auth/*",
  cors({
    origin: frontendOrigin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Session middleware
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

// Better Auth handler
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Global CORS
app.use("*", cors({
  origin: frontendOrigin,
  credentials: true,
}));

// Error handler
app.use("*", errorHandler);

// Routes
app.get("/", (c) => {
  return c.json({
    message: "Hello Hono!",
  });
});

// API routes
const apiRouter = createApiRouter();
app.route("/api", apiRouter);
