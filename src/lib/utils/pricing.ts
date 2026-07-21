import type { Coupon } from "@/types/cart";

const STANDARD_SHIPPING_FEE = 50;
const FREE_SHIPPING_THRESHOLD = 800;

export function calculateShippingFee(subtotal: number, coupon: Coupon | null): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  if (coupon?.code === "FREESHIP800") return 0;
  return STANDARD_SHIPPING_FEE;
}

export function calculateDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon || subtotal < coupon.minimumSpend) return 0;
  return Math.round((subtotal * coupon.discountPercent) / 100);
}

export function calculateTotal(subtotal: number, shippingFee: number, discount: number): number {
  return Math.max(0, subtotal + shippingFee - discount);
}
