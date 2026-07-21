import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductInfoTabs } from "@/components/product/product-info-tabs";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/mock-data/products";
import { getReviewsForProduct } from "@/lib/mock-data/reviews";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "ไม่พบสินค้า" };

  return {
    title: `${product.name} | ราคา ${product.price} บาท`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const reviews = getReviewsForProduct(product.id);
  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <ProductPurchasePanel product={product} />
      </div>

      <ProductInfoTabs product={product} />
      <ProductReviews reviews={reviews} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
