import type { FulfillmentMethod, PaymentMethod } from "@/types/order";

export const timeSlots = ["09:00 - 11:00", "11:00 - 13:00", "13:00 - 15:00", "15:00 - 17:00", "17:00 - 19:00"];

export const fulfillmentOptions: { value: FulfillmentMethod; label: string; description: string }[] = [
  { value: "pickup", label: "รับที่ร้าน", description: "รับสินค้าด้วยตัวเองที่หน้าร้าน ไม่มีค่าใช้จ่ายเพิ่มเติม" },
  { value: "delivery", label: "จัดส่งถึงบ้าน", description: "จัดส่งภายในกรุงเทพฯ และปริมณฑล มีค่าจัดส่งตามระยะทาง" },
];

export const paymentOptions: { value: PaymentMethod; label: string; description: string }[] = [
  { value: "cash-on-pickup", label: "ชำระเงินสดที่ร้าน", description: "ชำระเงินสดเมื่อมารับสินค้าหรือเมื่อได้รับของ" },
  { value: "promptpay", label: "พร้อมเพย์ / โอนเงิน", description: "โอนเงินผ่าน QR PromptPay แล้วแนบสลิปยืนยัน" },
  { value: "credit-card", label: "บัตรเครดิต / เดบิต", description: "ชำระผ่านบัตรเครดิตหรือเดบิตอย่างปลอดภัย" },
];
