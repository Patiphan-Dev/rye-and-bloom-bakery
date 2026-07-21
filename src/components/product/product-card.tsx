"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { StarRating } from "@/components/ui/star-rating";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const hasVariants = product.variantGroups.length > 0;
  const isOutOfStock = product.stockStatus === "out-of-stock";

  const handleQuickAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      imageUrl: product.images[0].url,
      unitPrice: product.price,
      quantity: 1,
      selections: [],
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card transition-shadow hover:shadow-lg">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-dark/30">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isBestSeller && <Badge tone="terracotta">ขายดี</Badge>}
          {product.isNew && <Badge tone="moss">สินค้าใหม่</Badge>}
          {product.compareAtPrice && <Badge tone="gold">ลดราคา</Badge>}
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/50">
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink">สินค้าหมด</span>
          </div>
        )}
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wishlisted ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-lg shadow-sm hover:bg-cream"
      >
        <span className={wishlisted ? "text-terracotta" : "text-ink-soft/70"}>{wishlisted ? "❤️" : "🤍"}</span>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link href={`/shop/${product.slug}`} className="line-clamp-1 font-heading text-base text-ink hover:text-terracotta">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-xs text-ink-soft">{product.shortDescription}</p>
        <div className="flex items-center gap-1.5 text-xs text-ink-soft">
          <StarRating rating={product.rating} />
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg text-terracotta">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-ink-soft/60 line-through">{formatCurrency(product.compareAtPrice)}</span>
            )}
          </div>
        </div>

        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="mt-2 w-full cursor-not-allowed rounded-full bg-ink/10 py-2 text-sm font-medium text-ink-soft"
          >
            สินค้าหมด
          </button>
        ) : hasVariants ? (
          <Link
            href={`/shop/${product.slug}`}
            className="mt-2 block w-full rounded-full border border-terracotta py-2 text-center text-sm font-medium text-terracotta hover:bg-terracotta hover:text-cream"
          >
            เลือกตัวเลือก
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleQuickAdd}
            className={cn(
              "mt-2 w-full rounded-full bg-terracotta py-2 text-sm font-medium text-cream hover:bg-terracotta-dark",
            )}
          >
            เพิ่มลงตะกร้า
          </button>
        )}
      </div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "terracotta" | "moss" | "gold"; children: React.ReactNode }) {
  const toneClasses = {
    terracotta: "bg-terracotta text-cream",
    moss: "bg-moss text-cream",
    gold: "bg-gold text-ink",
  } as const;

  return <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold", toneClasses[tone])}>{children}</span>;
}
