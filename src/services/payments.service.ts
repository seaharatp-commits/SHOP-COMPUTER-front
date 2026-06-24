import { apiFetch } from "@/lib/api/client";
import type { PaymentDto } from "@/types/api/order";

export const getPaymentStatus = (orderNo: string) =>
  apiFetch<PaymentDto>(`/payments/${orderNo}/status`, { auth: false });

export const confirmPayment = (orderNo: string) =>
  apiFetch<PaymentDto>(`/payments/${orderNo}/confirm`, { method: "POST", auth: false });
