"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import type { CartItemVariantSelection } from "@/types/cart";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { StarRating } from "@/components/ui/star-rating";
import { ShareButtons } from "./share-buttons";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const stockLabels: Record<Product["stockStatus"], { label: string; className: string }> = {
  "in-stock": { label: "พร้อมส่ง", className: "bg-moss/15 text-moss-dark" },
  "low-stock": { label: "เหลือน้อย", className: "bg-gold/20 text-terracotta-dark" },
  "out-of-stock": { label: "สินค้าหมด", className: "bg-ink/10 text-ink-soft" },
};

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.variantGroups.map((group) => [group.id, group.options[0]?.id])),
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selections: CartItemVariantSelection[] = useMemo(
    () =>
      product.variantGroups.map((group) => {
        const optionId = selectedOptions[group.id];
        const option = group.options.find((o) => o.id === optionId) ?? group.options[0];
        return {
          groupId: group.id,
          groupName: group.name,
          optionId: option.id,
          optionLabel: option.label,
          priceDelta: option.priceDelta,
        };
      }),
    [product.variantGroups, selectedOptions],
  );

  const unitPrice = product.price + selections.reduce((sum, selection) => sum + selection.priceDelta, 0);
  const isOutOfStock = product.stockStatus === "out-of-stock";
  const wishlisted = isWishlisted(product.id);
  const stockInfo = stockLabels[product.stockStatus];

  const buildCartItem = () => ({
    productId: product.id,
    name: product.name,
    imageUrl: product.images[0].url,
    unitPrice,
    quantity,
    selections,
  });

  const handleAddToCart = () => {
    addItem(buildCartItem());
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(buildCartItem());
    router.push("/checkout");
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", stockInfo.className)}>{stockInfo.label}</span>
        <span className="text-xs text-ink-soft">SKU: {product.sku}</span>
      </div>

      <h1 className="mt-3 font-heading text-3xl text-ink">{product.name}</h1>

      <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
        <StarRating rating={product.rating} size="md" />
        <span>
          {product.rating} ({product.reviewCount} รีวิว)
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-heading text-3xl text-terracotta">{formatCurrency(unitPrice)}</span>
        {product.compareAtPrice && (
          <span className="text-base text-ink-soft/60 line-through">{formatCurrency(product.compareAtPrice)}</span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>

      {product.variantGroups.map((group) => (
        <div key={group.id} className="mt-6">
          <h3 className="font-heading text-sm text-ink">{group.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOptions((current) => ({ ...current, [group.id]: option.id }))}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium",
                  selectedOptions[group.id] === option.id
                    ? "border-terracotta bg-terracotta text-cream"
                    : "border-ink/15 text-ink hover:border-terracotta",
                )}
              >
                {option.label}
                {option.priceDelta > 0 && ` (+${formatCurrency(option.priceDelta)})`}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6">
        <h3 className="font-heading text-sm text-ink">จำนวน</h3>
        <div className="mt-2 flex w-fit items-center gap-3 rounded-full border border-ink/15 px-3 py-1.5">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="ลดจำนวน"
            className="h-6 w-6 text-ink-soft hover:text-ink"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
            aria-label="เพิ่มจำนวน"
            className="h-6 w-6 text-ink-soft hover:text-ink"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="flex-1 rounded-full border-2 border-terracotta py-3 text-sm font-semibold text-terracotta hover:bg-terracotta/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {justAdded ? "✓ เพิ่มลงตะกร้าแล้ว" : "เพิ่มลงตะกร้า"}
        </button>
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className="flex-1 rounded-full bg-terracotta py-3 text-sm font-semibold text-cream hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          ซื้อเลย
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-lg hover:border-terracotta"
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="mt-6">
        <ShareButtons title={product.name} />
      </div>
    </div>
  );
}
