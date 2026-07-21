import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "ยืนยันคำสั่งซื้อ",
  description: "กรอกที่อยู่ เลือกวันเวลารับสินค้า วิธีจัดส่ง และวิธีชำระเงิน",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
