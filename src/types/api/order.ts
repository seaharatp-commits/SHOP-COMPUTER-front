export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "COMPLETED" | "CANCELLED" | "EXPIRED";
export type PaymentStatus = "PENDING" | "PAID" | "EXPIRED" | "FAILED";

export interface OrderItemComponentDto {
  id: string;
  orderItemId: string;
  categoryId: string;
  componentId: string | null;
  nameSnapshot: string;
  priceSnapshot: string;
}

export interface OrderItemDto {
  id: string;
  orderId: string;
  itemType: "PREBUILT" | "CUSTOM";
  prebuiltSetId: string | null;
  nameSnapshot: string;
  unitPrice: string;
  quantity: number;
  lineTotal: string;
  components: OrderItemComponentDto[];
}

export interface PaymentDto {
  id: string;
  orderId: string;
  method: string;
  amount: string;
  qrRef: string;
  qrPayload: string | null;
  status: PaymentStatus;
  expiresAt: string;
  paidAt: string | null;
  createdAt: string;
}

export interface OrderDto {
  id: string;
  orderNo: string;
  userId: string | null;
  status: OrderStatus;
  subtotal: string;
  shippingFee: string;
  total: string;
  shippingFullName: string;
  shippingPhone: string;
  shippingAddress: string;
  guestEmail: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItemDto[];
  payment: PaymentDto;
}

export interface CreateOrderItemInput {
  itemType: "PREBUILT" | "CUSTOM";
  prebuiltSetId?: string;
  build?: Record<string, string>;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  shippingFullName: string;
  shippingPhone: string;
  shippingAddress: string;
  guestEmail?: string;
}
