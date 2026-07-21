import type { Product } from "@/types/product";

export type SortOption = "newest" | "price-asc" | "price-desc" | "best-selling" | "rating";

export interface ProductFilters {
  query: string;
  categoryIds: string[];
  minPrice: number;
  maxPrice: number;
  bestSellerOnly: boolean;
}

export const defaultFilters: ProductFilters = {
  query: "",
  categoryIds: [],
  minPrice: 0,
  maxPrice: 1000,
  bestSellerOnly: false,
};

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query);
    const matchesCategory = filters.categoryIds.length === 0 || filters.categoryIds.includes(product.categoryId);
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const matchesBestSeller = !filters.bestSellerOnly || product.isBestSeller;

    return matchesQuery && matchesCategory && matchesPrice && matchesBestSeller;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "best-selling":
      return sorted.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviewCount - a.reviewCount);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
