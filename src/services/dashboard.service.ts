import { apiFetch } from "@/lib/api/client";
import type { DashboardOrderDto, DashboardStatsDto, DashboardUserDto } from "@/types/api/dashboard";

export const getStats = () => apiFetch<DashboardStatsDto>("/dashboard/stats");

export const getOrders = (page = 1, pageSize = 20) =>
  apiFetch<DashboardOrderDto[]>(`/dashboard/orders?page=${page}&pageSize=${pageSize}`);

export const getUsers = (page = 1, pageSize = 20) =>
  apiFetch<DashboardUserDto[]>(`/dashboard/users?page=${page}&pageSize=${pageSize}`);
