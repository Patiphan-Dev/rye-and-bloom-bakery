import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/mock-data/categories";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="เลือกซื้อตามหมวดหมู่" title="หมวดหมู่สินค้ายอดนิยม" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-card p-4 text-center transition-shadow hover:shadow-md"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-ink">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
