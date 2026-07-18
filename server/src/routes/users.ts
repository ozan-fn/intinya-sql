import { Hono } from "hono";
import type { Context } from "hono";
import { successResponse } from "../utils/response.js";

// Example route handlers demonstrating the structure
export const createUsersRouter = () => {
  const users = new Hono();

  // GET /users - List all users
  users.get("/", async (c: Context) => {
    const data = await c.req.json().catch(() => ({}));
    return successResponse(c, { users: [] });
  });

  // POST /users - Create user
  users.post("/", async (c: Context) => {
    const body = await c.req.json();
    return successResponse(c, { id: "123", ...body }, 201);
  });

  // GET /users/:id - Get single user
  users.get("/:id", async (c: Context) => {
    const id = c.req.param("id");
    return successResponse(c, { id, name: "User" });
  });

  return users;
};
