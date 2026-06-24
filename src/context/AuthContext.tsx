"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "@/services/auth.service";
import { getStoredAuth, setStoredAuth } from "@/lib/api/auth-storage";
import type { AuthUserDto } from "@/types/api/auth";
import type { LoginInput, RegisterInput } from "@/services/auth.service";

interface AuthContextValue {
  user: AuthUserDto | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (!stored) {
      setIsLoading(false);
      return;
    }
    authService
      .getMe()
      .then(setUser)
      .catch(() => setStoredAuth(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (input: LoginInput) => {
    const result = await authService.login(input);
    setStoredAuth({ accessToken: result.accessToken, refreshToken: result.refreshToken });
    setUser(result.user);
  };

  const register = async (input: RegisterInput) => {
    const result = await authService.register(input);
    setStoredAuth({ accessToken: result.accessToken, refreshToken: result.refreshToken });
    setUser(result.user);
  };

  const logout = async () => {
    const stored = getStoredAuth();
    if (stored?.refreshToken) {
      await authService.logout(stored.refreshToken).catch(() => undefined);
    }
    setStoredAuth(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
