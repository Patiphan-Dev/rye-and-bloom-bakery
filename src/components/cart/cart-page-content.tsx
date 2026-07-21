"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { CartItemRow } from "./cart-item-row";
import { CouponForm } from "./coupon-form";
import { OrderSummary } from "./order-summary";
import { calculateShippingFee, calculateDiscount, calculateTotal } from "@/lib/utils/pricing";

export function CartPageContent() {
  const { items, subtotal, appliedCoupon, updateQuantity, removeItem, isHydrated } = useCart();

  // Before localStorage hydration finishes, items is always [] — render nothing
  // rather than flashing the "empty cart" state for a cart that actually has items.
  if (!isHydrated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-5xl">🧺</span>
        <h1 className="font-heading text-2xl text-ink">ตะกร้าสินค้าของคุณว่างเปล่า</h1>
        <p className="text-sm text-ink-soft">เลือกซื้อเบเกอรี่อร่อยๆ ของเราได้เลย</p>
        <Link href="/shop" className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream hover:bg-terracotta-dark">
          เลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  const shippingFee = calculateShippingFee(subtotal, appliedCoupon);
  const discount = calculateDiscount(subtotal, appliedCoupon);
  const total = calculateTotal(subtotal, shippingFee, discount);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl text-ink">ตะกร้าสินค้า</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-ink/10 bg-card px-5">
          {items.map((item) => (
            <CartItemRow key={item.cartItemId} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))}
        </div>

        <div className="h-fit space-y-6 rounded-2xl border border-ink/10 bg-card p-5">
          <CouponForm />
          <OrderSummary subtotal={subtotal} shippingFee={shippingFee} discount={discount} total={total} />
          <Link
            href="/checkout"
            className="block w-full rounded-full bg-terracotta py-3 text-center text-sm font-semibold text-cream hover:bg-terracotta-dark"
          >
            ดำเนินการชำระเงิน
          </Link>
          <Link href="/shop" className="block text-center text-sm text-ink-soft hover:text-terracotta">
            ← เลือกซื้อสินค้าต่อ
          </Link>
        </div>
      </div>
    </div>
  );
}
