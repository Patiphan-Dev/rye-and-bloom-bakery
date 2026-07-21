import type { Metadata } from "next";
import { promotions } from "@/lib/mock-data/promotions";
import { PromotionCard } from "@/components/promotions/promotion-card";

export const metadata: Metadata = {
  title: "โปรโมชั่นทั้งหมด",
  description: "รวมโปรโมชั่นและส่วนลดพิเศษจากร้านของเรา",
};

export default function PromotionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl text-ink">โปรโมชั่นทั้งหมด</h1>
        <p className="mt-2 text-sm text-ink-soft">รวมส่วนลดและสิทธิพิเศษสำหรับลูกค้าทุกคน</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </div>
    </div>
  );
}
