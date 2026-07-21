import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils/cn";

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  tinted?: boolean;
}

export function ProductSection({ eyebrow, title, description, products, tinted }: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("px-4 py-14 sm:px-6 lg:px-8", tinted && "bg-cream-dark/30")}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} actionHref="/shop" actionLabel="ดูสินค้าทั้งหมด" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
