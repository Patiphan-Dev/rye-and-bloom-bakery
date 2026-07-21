import type { Order, OrderStatus } from "@/types/order";
import { formatCurrency, formatDateThai } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const statusStyles: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "รอดำเนินการ", className: "bg-ink/10 text-ink-soft" },
  confirmed: { label: "ยืนยันแล้ว", className: "bg-gold/20 text-terracotta-dark" },
  preparing: { label: "กำลังเตรียม", className: "bg-gold/20 text-terracotta-dark" },
  ready: { label: "พร้อมรับ/ส่ง", className: "bg-moss/15 text-moss-dark" },
  completed: { label: "สำเร็จ", className: "bg-moss/15 text-moss-dark" },
  cancelled: { label: "ยกเลิก", className: "bg-terracotta/10 text-terracotta" },
};

export function OrderHistoryList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="py-12 text-center text-sm text-ink-soft">ยังไม่มีประวัติคำสั่งซื้อ</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const status = statusStyles[order.status];
        return (
          <div key={order.id} className="rounded-2xl border border-ink/10 bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-heading text-base text-ink">#{order.orderNumber}</p>
                <p className="text-xs text-ink-soft">สั่งซื้อเมื่อ {formatDateThai(order.placedAt)}</p>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", status.className)}>{status.label}</span>
            </div>

            <ul className="mt-4 space-y-1 border-t border-ink/10 pt-3 text-sm text-ink-soft">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3 text-sm">
              <span className="text-ink-soft">
                {order.fulfillmentMethod === "pickup" ? "รับที่ร้าน" : "จัดส่ง"} · {order.scheduledDate} · {order.scheduledTimeSlot}
              </span>
              <span className="font-heading text-base text-terracotta">{formatCurrency(order.total)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
