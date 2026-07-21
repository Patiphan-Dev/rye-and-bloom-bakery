import type { Product, ProductVariantGroup, StockStatus } from "@/types/product";

export interface ProductSeed {
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  storageInstructions: string;
  shelfLifeDays: number;
  weightGrams: number;
  price: number;
  compareAtPrice?: number;
  imageIds: string[];
  stockQuantity: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSeasonal?: boolean;
  rating: number;
  reviewCount: number;
  variantGroups?: ProductVariantGroup[];
  daysAgoCreated: number;
}

function resolveStockStatus(quantity: number): StockStatus {
  if (quantity <= 0) return "out-of-stock";
  if (quantity <= 5) return "low-stock";
  return "in-stock";
}

function toIsoDaysAgo(daysAgo: number): string {
  const date = new Date("2026-07-22T00:00:00.000Z");
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString();
}

export function buildProduct(seed: ProductSeed, index: number): Product {
  const id = `prod-${String(index + 1).padStart(3, "0")}`;
  const sku = `BK-${seed.categoryId.replace("cat-", "").toUpperCase().slice(0, 3)}-${String(index + 1).padStart(4, "0")}`;

  return {
    id,
    slug: seed.slug,
    name: seed.name,
    categoryId: seed.categoryId,
    shortDescription: seed.shortDescription,
    description: seed.description,
    ingredients: seed.ingredients,
    storageInstructions: seed.storageInstructions,
    shelfLifeDays: seed.shelfLifeDays,
    weightGrams: seed.weightGrams,
    sku,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    images: seed.imageIds.map((photoId, imageIndex) => ({
      id: `${id}-img-${imageIndex + 1}`,
      url: `https://images.unsplash.com/${photoId}?w=1200&q=80`,
      alt: `${seed.name} รูปที่ ${imageIndex + 1}`,
    })),
    stockStatus: resolveStockStatus(seed.stockQuantity),
    stockQuantity: seed.stockQuantity,
    isBestSeller: seed.isBestSeller ?? false,
    isNew: seed.isNew ?? false,
    isSeasonal: seed.isSeasonal ?? false,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    variantGroups: seed.variantGroups ?? [],
    relatedProductIds: [],
    createdAt: toIsoDaysAgo(seed.daysAgoCreated),
  };
}

export const sizeVariantGroup: ProductVariantGroup = {
  id: "size",
  name: "ขนาด",
  options: [
    { id: "size-regular", label: "ปกติ", priceDelta: 0 },
    { id: "size-large", label: "ไซซ์ใหญ่", priceDelta: 40 },
  ],
};

export const flavorVariantGroup = (flavors: string[]): ProductVariantGroup => ({
  id: "flavor",
  name: "รสชาติ",
  options: flavors.map((flavor, i) => ({
    id: `flavor-${i}`,
    label: flavor,
    priceDelta: 0,
  })),
});
