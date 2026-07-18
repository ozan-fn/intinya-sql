import { Context, Next } from "hono";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const error = err instanceof AppError
      ? err
      : err instanceof Error
        ? new AppError(500, err.message, "INTERNAL_ERROR")
        : new AppError(500, "Unknown error", "UNKNOWN_ERROR");

    console.error(`[${error.code}]`, error.message);

    return c.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      },
      error.statusCode as any,
    );
  }
};
