import { Context, Next } from "hono";
import { AppError } from "./error.js";

type ValidateTarget = "json" | "query" | "param";

export const createValidator = (schema: any, target: ValidateTarget = "json") =>
  async (c: Context, next: Next) => {
    try {
      let data;
      if (target === "json") data = await c.req.json();
      else if (target === "query") data = c.req.query();
      else if (target === "param") data = c.req.param();

      const validated = schema.parse(data);
      c.set("validated", validated);
      await next();
    } catch (err: any) {
      throw new AppError(400, "Validation failed", "VALIDATION_ERROR");
    }
  };

export const getValidated = <T>(c: Context): T => {
  const validated = c.get("validated");
  if (!validated) {
    throw new AppError(500, "Validation context not found", "CONTEXT_ERROR");
  }
  return validated as T;
};
