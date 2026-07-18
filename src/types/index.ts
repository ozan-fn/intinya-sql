// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthSession {
  user: User;
  session: {
    id: string;
    expiresAt: string;
  };
}

// API Error
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
