import type { Context } from "hono";

export const successResponse = <T>(c: Context, data: T, statusCode = 200) => {
  return c.json({
    success: true,
    data,
  }, statusCode as any);
};

export const errorResponse = (c: Context, message: string, code: string, statusCode = 400) => {
  return c.json({
    success: false,
    error: { code, message },
  }, statusCode as any);
};
