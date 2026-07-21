import type { Coupon } from "@/types/cart";

export const availableCoupons: Coupon[] = [
  { code: "CROISSANT15", description: "ลด 15% สำหรับครัวซองต์และเพสตรี้", discountPercent: 15, minimumSpend: 0 },
  { code: "WELCOME100", description: "ส่วนลดสมาชิกใหม่ 100 บาท", discountPercent: 20, minimumSpend: 500 },
  { code: "RAINYSEASON", description: "ลด 20% โปรฤดูฝน", discountPercent: 20, minimumSpend: 0 },
  { code: "FREESHIP800", description: "ส่งฟรีเมื่อครบ 800 บาท", discountPercent: 0, minimumSpend: 800 },
];
