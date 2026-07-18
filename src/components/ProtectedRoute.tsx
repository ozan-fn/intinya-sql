import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession();
      if (!session) {
        navigate({ to: "/" });
      }
    };
    checkAuth();
  }, [navigate]);

  return <>{children}</>;
}
