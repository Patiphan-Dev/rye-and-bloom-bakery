import Image from "next/image";
import Link from "next/link";
import { getActivePromotions } from "@/lib/mock-data/promotions";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDateThai } from "@/lib/utils/format";

export function PromotionsStrip() {
  const promotions = getActivePromotions();
  if (promotions.length === 0) return null;

  return (
    <section className="bg-moss/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="อย่าพลาด" title="โปรโมชั่นพิเศษ" actionHref="/promotions" actionLabel="ดูโปรโมชั่นทั้งหมด" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promotions.map((promo) => (
            <Link
              key={promo.id}
              href="/promotions"
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-card transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-cream">
                  {promo.discountLabel}
                </span>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 font-heading text-base text-ink">{promo.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{promo.description}</p>
                <p className="mt-2 text-xs text-moss-dark">ใช้ได้ถึง {formatDateThai(promo.validUntil)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
