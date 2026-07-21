import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/types/cart";
import { formatCurrency } from "@/lib/utils/format";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (cartItemId: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex gap-4 border-b border-ink/10 py-5 last:border-none">
      <Image src={item.imageUrl} alt={item.name} width={96} height={96} className="h-24 w-24 shrink-0 rounded-xl object-cover" />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/shop`} className="font-heading text-base text-ink hover:text-terracotta">
            {item.name}
          </Link>
          {item.selections.length > 0 && (
            <p className="mt-1 text-xs text-ink-soft">
              {item.selections.map((selection) => `${selection.groupName}: ${selection.optionLabel}`).join(" · ")}
            </p>
          )}
          <p className="mt-1 text-sm text-terracotta">{formatCurrency(item.unitPrice)} / ชิ้น</p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-1.5">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              aria-label="ลดจำนวน"
              className="h-6 w-6 text-ink-soft hover:text-ink"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              aria-label="เพิ่มจำนวน"
              className="h-6 w-6 text-ink-soft hover:text-ink"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-heading text-base text-ink">{formatCurrency(lineTotal)}</span>
            <button
              type="button"
              onClick={() => onRemove(item.cartItemId)}
              aria-label={`ลบ ${item.name} ออกจากตะกร้า`}
              className="text-sm text-ink-soft/70 hover:text-terracotta"
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
