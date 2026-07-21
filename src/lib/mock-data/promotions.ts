import type { Promotion } from "@/types/content";

export const promotions: Promotion[] = [
  {
    id: "promo-001",
    title: "ซื้อครัวซองต์ครบ 5 ชิ้น ลด 15%",
    description: "สั่งครัวซองต์เนยแท้หรือแพงโอช็อกโกลาต์ครบ 5 ชิ้นขึ้นไป รับส่วนลดทันที 15% ที่หน้าร้านและสั่งออนไลน์",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80",
    discountLabel: "ลด 15%",
    code: "CROISSANT15",
    validUntil: "2026-08-31T23:59:59.000Z",
  },
  {
    id: "promo-002",
    title: "สมาชิกใหม่ลดทันที 100 บาท",
    description: "สมัครสมาชิกวันนี้ รับคูปองส่วนลด 100 บาท เมื่อสั่งซื้อครบ 500 บาทขึ้นไปสำหรับออเดอร์แรก",
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&q=80",
    discountLabel: "ลด 100 บาท",
    code: "WELCOME100",
    validUntil: "2026-12-31T23:59:59.000Z",
  },
  {
    id: "promo-003",
    title: "โปรฤดูฝน เค้กเผือกมะพร้าว ลด 20%",
    description: "ต้อนรับฤดูฝนด้วยเค้กเผือกมะพร้าวสูตรพิเศษ ลดราคา 20% ตลอดเดือน จำนวนจำกัดต่อวัน",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200&q=80",
    discountLabel: "ลด 20%",
    code: "RAINYSEASON",
    validUntil: "2026-08-15T23:59:59.000Z",
  },
  {
    id: "promo-004",
    title: "ส่งฟรีเมื่อสั่งครบ 800 บาท",
    description: "สั่งซื้อสินค้าครบ 800 บาทขึ้นไป รับสิทธิ์จัดส่งฟรีทั่วกรุงเทพฯ และปริมณฑล",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    discountLabel: "ส่งฟรี",
    code: "FREESHIP800",
    validUntil: "2026-09-30T23:59:59.000Z",
  },
];

export function getActivePromotions(): Promotion[] {
  const now = new Date("2026-07-22T00:00:00.000Z");
  return promotions.filter((promo) => new Date(promo.validUntil) > now);
}
