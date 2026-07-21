export interface ProductVariantOption {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ProductVariantGroup {
  id: string;
  name: string;
  options: ProductVariantOption[];
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  storageInstructions: string;
  shelfLifeDays: number;
  weightGrams: number;
  sku: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  stockStatus: StockStatus;
  stockQuantity: number;
  isBestSeller: boolean;
  isNew: boolean;
  isSeasonal: boolean;
  rating: number;
  reviewCount: number;
  variantGroups: ProductVariantGroup[];
  relatedProductIds: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
}
