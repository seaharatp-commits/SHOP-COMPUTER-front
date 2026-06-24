import { apiFetch } from "@/lib/api/client";
import type { AuthResponseDto, AuthUserDto } from "@/types/api/auth";

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const register = (input: RegisterInput) =>
  apiFetch<AuthResponseDto>("/auth/register", { method: "POST", body: JSON.stringify(input), auth: false });

export const login = (input: LoginInput) =>
  apiFetch<AuthResponseDto>("/auth/login", { method: "POST", body: JSON.stringify(input), auth: false });

export const logout = (refreshToken: string) =>
  apiFetch<{ success: boolean }>("/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) });

export const getMe = () => apiFetch<AuthUserDto>("/auth/me");
