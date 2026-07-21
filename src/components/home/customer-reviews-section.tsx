import { getFeaturedReviews } from "@/lib/mock-data/reviews";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { formatRelativeDays } from "@/lib/utils/format";

export function CustomerReviewsSection() {
  const reviews = getFeaturedReviews(6);

  return (
    <section className="bg-cream-dark/30 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="เสียงจากลูกค้า" title="รีวิวจากลูกค้าจริง" actionHref="/reviews" actionLabel="ดูรีวิวทั้งหมด" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-card p-6">
              <StarRating rating={review.rating} size="md" />
              <p className="font-heading text-base text-ink">{review.title}</p>
              <p className="line-clamp-3 flex-1 text-sm text-ink-soft">{review.comment}</p>
              <div className="flex items-center justify-between text-xs text-ink-soft/80">
                <span className="font-medium text-ink">{review.customerName}</span>
                <span>{formatRelativeDays(review.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
