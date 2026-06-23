import type { PCBuild } from "@/types/app/product";

export type CartItemType = "prebuilt" | "custom";

export interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  build: PCBuild;
}

export type PaymentStatus = "pending" | "paid" | "expired";
