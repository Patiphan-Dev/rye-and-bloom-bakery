import { formatCurrency } from "@/lib/utils/format";

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

export function OrderSummary({ subtotal, shippingFee, discount, total }: OrderSummaryProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between text-ink-soft">
        <span>ยอดรวมสินค้า</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between text-ink-soft">
        <span>ค่าจัดส่ง</span>
        <span>{shippingFee === 0 ? "ฟรี" : formatCurrency(shippingFee)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-moss-dark">
          <span>ส่วนลด</span>
          <span>-{formatCurrency(discount)}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-ink/10 pt-3 font-heading text-lg text-ink">
        <span>ยอดชำระทั้งหมด</span>
        <span className="text-terracotta">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
