"use client";

import { useMemo, useState } from "react";
import type { Review } from "@/types/review";
import { StarRating } from "@/components/ui/star-rating";
import { formatRelativeDays } from "@/lib/utils/format";
import { getProductById } from "@/lib/mock-data/products";
import { cn } from "@/lib/utils/cn";

export function ReviewsExplorer({ reviews }: { reviews: Review[] }) {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const filteredReviews = useMemo(
    () => (ratingFilter ? reviews.filter((review) => review.rating === ratingFilter) : reviews),
    [reviews, ratingFilter],
  );

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-card p-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-heading text-3xl text-ink">{averageRating.toFixed(1)} / 5</p>
          <div className="mt-1 flex justify-center sm:justify-start">
            <StarRating rating={averageRating} size="md" />
          </div>
          <p className="mt-1 text-xs text-ink-soft">จากรีวิวทั้งหมด {reviews.length} รายการ</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setRatingFilter(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium",
              ratingFilter === null ? "border-terracotta bg-terracotta text-cream" : "border-ink/15 text-ink-soft",
            )}
          >
            ทั้งหมด
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRatingFilter(star)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                ratingFilter === star ? "border-terracotta bg-terracotta text-cream" : "border-ink/15 text-ink-soft",
              )}
            >
              {star} ดาว
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((review) => {
          const product = review.productId ? getProductById(review.productId) : undefined;
          return (
            <div key={review.id} className="rounded-2xl border border-ink/10 bg-card p-5">
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-xs text-ink-soft/70">{formatRelativeDays(review.createdAt)}</span>
              </div>
              {product && <p className="mt-2 text-xs font-medium text-terracotta">{product.name}</p>}
              <p className="mt-1 font-heading text-base text-ink">{review.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{review.comment}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft/80">
                <span className="font-medium text-ink">{review.customerName}</span>
                {review.verifiedPurchase && <span className="text-moss-dark">✓ ซื้อสินค้าจริง</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
