import type { Product } from "@/types/product";
import { buildProduct } from "./product-builder";
import { breadCakeSeeds } from "./seeds/bread-cake.seeds";
import { pastryOtherSeeds } from "./seeds/pastry-other.seeds";

const allSeeds = [...breadCakeSeeds, ...pastryOtherSeeds];

function attachRelatedProducts(items: Product[]): Product[] {
  return items.map((product) => {
    const sameCategory = items.filter(
      (candidate) => candidate.categoryId === product.categoryId && candidate.id !== product.id,
    );
    return {
      ...product,
      relatedProductIds: sameCategory.slice(0, 4).map((related) => related.id),
    };
  });
}

export const products: Product[] = attachRelatedProducts(allSeeds.map(buildProduct));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew);
}

export function getSeasonalProducts(): Product[] {
  return products.filter((product) => product.isSeasonal);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProductIds
    .map((id) => getProductById(id))
    .filter((related): related is Product => Boolean(related));
}
