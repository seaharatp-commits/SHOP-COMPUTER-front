import type { OrderStatus, PaymentDto } from "./order";
import type { Role } from "./auth";

export interface DashboardStatsDto {
  totalUsers: number;
  totalOrders: number;
  paidOrders: number;
  totalRevenue: string | number;
  ordersByStatus: { status: OrderStatus; count: number }[];
}

export interface DashboardOrderDto {
  id: string;
  orderNo: string;
  userId: string | null;
  status: OrderStatus;
  total: string;
  shippingFullName: string;
  shippingPhone: string;
  guestEmail: string | null;
  createdAt: string;
  user: { id: string; email: string; fullName: string } | null;
  payment: PaymentDto | null;
}

export interface DashboardUserDto {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: Role;
  createdAt: string;
  lastLoginAt: string | null;
}
