import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProductSection } from "@/components/home/product-section";
import { PromotionsStrip } from "@/components/home/promotions-strip";
import { StoreHighlights } from "@/components/home/store-highlights";
import { CustomerReviewsSection } from "@/components/home/customer-reviews-section";
import { InstagramGallerySection } from "@/components/home/instagram-gallery";
import { StoreMapSection } from "@/components/home/store-map-section";
import { getBestSellers, getNewArrivals, getSeasonalProducts } from "@/lib/mock-data/products";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <ProductSection
        eyebrow="เพิ่งเข้าร้าน"
        title="สินค้าใหม่"
        description="เมนูใหม่ล่าสุดที่เพิ่งอบสดออกจากเตา"
        products={getNewArrivals()}
      />
      <ProductSection
        eyebrow="ลูกค้าเลือกมากที่สุด"
        title="Best Seller"
        description="เมนูขายดีที่ลูกค้าสั่งซ้ำมากที่สุด"
        products={getBestSellers()}
        tinted
      />
      <PromotionsStrip />
      <ProductSection
        eyebrow="มีเวลาจำกัด"
        title="สินค้าตามฤดูกาล"
        description="เมนูพิเศษที่มีเฉพาะช่วงเวลานี้เท่านั้น"
        products={getSeasonalProducts()}
      />
      <StoreHighlights />
      <CustomerReviewsSection />
      <InstagramGallerySection />
      <StoreMapSection />
    </>
  );
}
