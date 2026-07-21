"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FulfillmentMethod, PaymentMethod } from "@/types/order";
import { useCart } from "@/context/cart-context";
import { useMember } from "@/context/member-context";
import { CheckoutAddressSection } from "./checkout-address-section";
import { CheckoutScheduleSection } from "./checkout-schedule-section";
import { CheckoutPaymentSection } from "./checkout-payment-section";
import { OrderSummary } from "@/components/cart/order-summary";
import { OrderConfirmation } from "./order-confirmation";
import { calculateShippingFee, calculateDiscount, calculateTotal } from "@/lib/utils/pricing";

function getMinScheduleDate(): string {
  const tomorrow = new Date("2026-07-22T00:00:00.000Z");
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

function generateOrderNumber(): string {
  const random = Math.floor(1000 + (Date.now() % 9000));
  return `BK20260722-${random}`;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, appliedCoupon, clearCart, isHydrated } = useCart();
  const { profile } = useMember();

  const [fullName, setFullName] = useState(profile?.fullName ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [address, setAddress] = useState(profile?.address ?? "");
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>("pickup");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash-on-pickup");
  const [notes, setNotes] = useState("");
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);

  const shippingFee = calculateShippingFee(subtotal, appliedCoupon);
  const discount = calculateDiscount(subtotal, appliedCoupon);
  const total = calculateTotal(subtotal, shippingFee, discount);

  useEffect(() => {
    // Wait for the cart to finish reading localStorage before deciding it's
    // empty — checking items.length pre-hydration would bounce a real cart.
    if (isHydrated && items.length === 0 && !confirmedOrderNumber) {
      router.replace("/cart");
    }
  }, [isHydrated, items.length, confirmedOrderNumber, router]);

  if (!isHydrated || (items.length === 0 && !confirmedOrderNumber)) {
    return null;
  }

  if (confirmedOrderNumber) {
    return <OrderConfirmation orderNumber={confirmedOrderNumber} />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const orderNumber = generateOrderNumber();
    setConfirmedOrderNumber(orderNumber);
    clearCart();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl text-ink">ยืนยันคำสั่งซื้อ</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <CheckoutAddressSection
            fullName={fullName}
            phone={phone}
            address={address}
            onFullNameChange={setFullName}
            onPhoneChange={setPhone}
            onAddressChange={setAddress}
          />
          <CheckoutScheduleSection
            fulfillmentMethod={fulfillmentMethod}
            scheduledDate={scheduledDate}
            scheduledTimeSlot={scheduledTimeSlot}
            minDate={getMinScheduleDate()}
            onFulfillmentChange={setFulfillmentMethod}
            onDateChange={setScheduledDate}
            onTimeSlotChange={setScheduledTimeSlot}
          />
          <CheckoutPaymentSection
            paymentMethod={paymentMethod}
            notes={notes}
            onPaymentMethodChange={setPaymentMethod}
            onNotesChange={setNotes}
          />
        </div>

        <div className="h-fit space-y-6 rounded-2xl border border-ink/10 bg-card p-5">
          <h2 className="font-heading text-lg text-ink">สรุปคำสั่งซื้อ ({items.length} รายการ)</h2>
          <OrderSummary subtotal={subtotal} shippingFee={shippingFee} discount={discount} total={total} />
          <button
            type="submit"
            className="w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-cream hover:bg-terracotta-dark"
          >
            ยืนยันคำสั่งซื้อ
          </button>
          <Link href="/cart" className="block text-center text-sm text-ink-soft hover:text-terracotta">
            ← กลับไปแก้ไขตะกร้า
          </Link>
        </div>
      </div>
    </form>
  );
}
