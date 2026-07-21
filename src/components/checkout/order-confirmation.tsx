import Link from "next/link";

export function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="text-5xl">🎉</span>
      <h1 className="font-heading text-2xl text-ink">สั่งซื้อสำเร็จแล้ว!</h1>
      <p className="text-sm text-ink-soft">
        หมายเลขคำสั่งซื้อของคุณคือ <strong className="text-ink">{orderNumber}</strong> ทางร้านจะติดต่อยืนยันรายละเอียดกับคุณอีกครั้ง
      </p>
      <p className="text-xs text-ink-soft/70">
        * นี่คือเว็บไซต์ตัวอย่างเพื่อการสาธิต ไม่มีการตัดเงินหรือดำเนินการชำระเงินจริงเกิดขึ้น
      </p>
      <div className="mt-2 flex gap-3">
        <Link href="/account/orders" className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-terracotta hover:text-terracotta">
          ดูประวัติคำสั่งซื้อ
        </Link>
        <Link href="/shop" className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream hover:bg-terracotta-dark">
          เลือกซื้อสินค้าต่อ
        </Link>
      </div>
    </div>
  );
}
