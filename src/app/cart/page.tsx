import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = {
  title: "ตะกร้าสินค้า",
  description: "ตรวจสอบรายการสินค้าในตะกร้าและดำเนินการชำระเงิน",
};

export default function CartPage() {
  return <CartPageContent />;
}
