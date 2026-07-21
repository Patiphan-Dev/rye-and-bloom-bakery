import type { Metadata } from "next";
import { reviews } from "@/lib/mock-data/reviews";
import { ReviewsExplorer } from "@/components/reviews/reviews-explorer";

export const metadata: Metadata = {
  title: "รีวิวจากลูกค้า",
  description: "อ่านรีวิวและความคิดเห็นจากลูกค้าจริงที่สั่งซื้อสินค้าของเรา",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl text-ink">รีวิวจากลูกค้า</h1>
        <p className="mt-2 text-sm text-ink-soft">เสียงตอบรับจากลูกค้าที่ไว้วางใจเรา</p>
      </div>
      <ReviewsExplorer reviews={reviews} />
    </div>
  );
}
