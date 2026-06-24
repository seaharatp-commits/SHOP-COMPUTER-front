import { apiFetch } from "@/lib/api/client";
import type { CreateOrderInput, OrderDto } from "@/types/api/order";

export const createOrder = (input: CreateOrderInput) =>
  apiFetch<OrderDto>("/orders", { method: "POST", body: JSON.stringify(input), auth: true });

export const getOrderByNo = (orderNo: string) => apiFetch<OrderDto>(`/orders/${orderNo}`, { auth: true });

export const listMyOrders = () => apiFetch<OrderDto[]>("/orders/mine");
