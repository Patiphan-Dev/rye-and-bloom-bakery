import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="font-heading text-2xl text-ink">สินค้าแนะนำ</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
