"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Drawer } from "@/components/ui/drawer";
import { formatCurrency } from "@/lib/utils/format";

export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`ตะกร้าสินค้า (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="text-4xl">🧺</span>
          <p className="text-ink-soft">ยังไม่มีสินค้าในตะกร้า</p>
          <Link
            href="/shop"
            onClick={onClose}
            className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream hover:bg-terracotta-dark"
          >
            เลือกซื้อสินค้า
          </Link>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-ink/10 px-5">
            {items.map((item) => (
              <li key={item.cartItemId} className="flex gap-3 py-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                  {item.selections.length > 0 && (
                    <p className="text-xs text-ink-soft">
                      {item.selections.map((selection) => selection.optionLabel).join(" · ")}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-ink/15 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        aria-label="ลดจำนวน"
                        className="h-5 w-5 text-ink-soft hover:text-ink"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        aria-label="เพิ่มจำนวน"
                        className="h-5 w-5 text-ink-soft hover:text-ink"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-terracotta">{formatCurrency(item.unitPrice * item.quantity)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.cartItemId)}
                  aria-label={`ลบ ${item.name}`}
                  className="self-start text-ink-soft/60 hover:text-terracotta"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/10 bg-card px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-ink-soft">ยอดรวม</span>
              <span className="font-heading text-lg text-ink">{formatCurrency(subtotal)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full rounded-full bg-terracotta py-3 text-center text-sm font-semibold text-cream hover:bg-terracotta-dark"
            >
              ไปที่ตะกร้าสินค้า
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
}
