export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
export type FulfillmentMethod = "pickup" | "delivery";
export type PaymentMethod = "cash-on-pickup" | "promptpay" | "credit-card";

export interface OrderItem {
  productName: string;
  variantSummary: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedAt: string;
  status: OrderStatus;
  fulfillmentMethod: FulfillmentMethod;
  scheduledDate: string;
  scheduledTimeSlot: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}
