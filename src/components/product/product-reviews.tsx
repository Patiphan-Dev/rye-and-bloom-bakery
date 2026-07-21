import type { Review } from "@/types/review";
import { StarRating } from "@/components/ui/star-rating";
import { formatRelativeDays } from "@/lib/utils/format";

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="py-8 text-sm text-ink-soft">ยังไม่มีรีวิวสำหรับสินค้านี้</p>;
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-4">
        <h2 className="font-heading text-2xl text-ink">รีวิวจากลูกค้า</h2>
        <div className="flex items-center gap-1.5 text-sm text-ink-soft">
          <StarRating rating={averageRating} size="md" />
          <span>
            {averageRating.toFixed(1)} ({reviews.length} รีวิว)
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-ink/10 bg-card p-5">
            <div className="flex items-center justify-between">
              <StarRating rating={review.rating} />
              <span className="text-xs text-ink-soft/70">{formatRelativeDays(review.createdAt)}</span>
            </div>
            <p className="mt-2 font-heading text-base text-ink">{review.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{review.comment}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft/80">
              <span className="font-medium text-ink">{review.customerName}</span>
              {review.verifiedPurchase && <span className="text-moss-dark">✓ ซื้อสินค้าจริง</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
