import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const session = await authClient.getSession();
      setUser(session?.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, refetch: checkSession };
}
