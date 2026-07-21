"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";

export function CouponForm() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;

    const result = applyCoupon(code);
    setMessage({ text: result.message, isError: !result.success });
    if (result.success) setCode("");
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between rounded-xl bg-moss/10 px-4 py-3 text-sm">
        <span className="text-moss-dark">
          ใช้คูปอง <strong>{appliedCoupon.code}</strong> แล้ว
        </span>
        <button type="button" onClick={removeCoupon} className="text-ink-soft hover:text-terracotta">
          ยกเลิก
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="กรอกรหัสคูปอง"
          aria-label="รหัสคูปอง"
          className="flex-1 rounded-full border border-ink/15 bg-card px-4 py-2 text-sm focus:border-terracotta focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-cream hover:bg-ink/80"
        >
          ใช้คูปอง
        </button>
      </div>
      {message && (
        <p className={message.isError ? "text-xs text-terracotta" : "text-xs text-moss-dark"}>{message.text}</p>
      )}
    </form>
  );
}
