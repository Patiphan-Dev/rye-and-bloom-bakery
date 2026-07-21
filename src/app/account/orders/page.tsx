"use client";

import { AuthGate } from "@/components/account/auth-gate";
import { OrderHistoryList } from "@/components/account/order-history-list";
import { mockOrderHistory } from "@/lib/mock-data/orders";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-heading text-2xl text-ink">ประวัติคำสั่งซื้อ</h1>
      <AuthGate>{() => <OrderHistoryList orders={mockOrderHistory} />}</AuthGate>
    </div>
  );
}
