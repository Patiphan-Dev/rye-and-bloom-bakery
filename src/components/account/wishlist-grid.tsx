"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { ProductCard } from "@/components/product/product-card";
import { getProductById } from "@/lib/mock-data/products";

export function WishlistGrid() {
  const { productIds, isHydrated } = useWishlist();
  const wishlistedProducts = productIds
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (!isHydrated) {
    return null;
  }

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-4xl">🤍</span>
        <p className="text-sm text-ink-soft">ยังไม่มีสินค้าในรายการโปรด</p>
        <Link href="/shop" className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream hover:bg-terracotta-dark">
          เลือกดูสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {wishlistedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
