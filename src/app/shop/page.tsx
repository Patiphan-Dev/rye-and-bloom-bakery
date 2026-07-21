import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopExplorer } from "@/components/shop/shop-explorer";
import { products } from "@/lib/mock-data/products";

export const metadata: Metadata = {
  title: "ร้านค้า | ค้นหาและเลือกซื้อเบเกอรี่ทุกเมนู",
  description: "เลือกซื้อขนมปัง เค้ก เพสตรี้ คุกกี้ และของหวาน พร้อมค้นหา กรอง และเรียงลำดับสินค้าได้ตามใจ",
};

export default function ShopPage() {
  return (
    <div>
      <div className="border-b border-ink/10 bg-cream-dark/30 px-4 py-8 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl text-ink">ร้านค้าของเรา</h1>
        <p className="mt-2 text-sm text-ink-soft">รวมเบเกอรี่โฮมเมดคุณภาพดี อบสดใหม่ทุกวัน</p>
      </div>
      <Suspense fallback={<div className="py-20 text-center text-ink-soft">กำลังโหลดสินค้า...</div>}>
        <ShopExplorer allProducts={products} />
      </Suspense>
    </div>
  );
}
