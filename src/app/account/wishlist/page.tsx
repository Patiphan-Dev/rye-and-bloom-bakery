"use client";

import { AuthGate } from "@/components/account/auth-gate";
import { WishlistGrid } from "@/components/account/wishlist-grid";

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-heading text-2xl text-ink">รายการโปรดของฉัน</h1>
      <AuthGate>{() => <WishlistGrid />}</AuthGate>
    </div>
  );
}
