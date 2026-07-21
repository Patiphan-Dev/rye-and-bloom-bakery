import type { Review } from "@/types/review";
import { products } from "./products";

interface ReviewSeed {
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  daysAgo: number;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

const reviewTemplates: ReviewSeed[] = [
  {
    customerName: "พิมพ์ชนก ส.",
    rating: 5,
    title: "อร่อยมากกก สั่งซ้ำแน่นอน",
    comment: "รสชาติดีเกินคาด หอมเนยสดจริงๆ แพ็คมาดีไม่บุบ ส่งไวมากค่ะ",
    daysAgo: 4,
    verifiedPurchase: true,
    helpfulCount: 24,
  },
  {
    customerName: "ธนวัฒน์ ก.",
    rating: 5,
    title: "คุณภาพระดับร้านโรงแรม",
    comment: "ซื้อไปฝากลูกค้า ทุกคนชมว่าอร่อย เนื้อสัมผัสดีมาก ราคาคุ้มค่า",
    daysAgo: 9,
    verifiedPurchase: true,
    helpfulCount: 17,
  },
  {
    customerName: "อรวรรณ พ.",
    rating: 4,
    title: "ดีมากแต่หวานไปนิด",
    comment: "รสชาติโดยรวมดี หอมอร่อย แต่ส่วนตัวคิดว่าหวานไปนิดหน่อยสำหรับตัวเอง",
    daysAgo: 15,
    verifiedPurchase: true,
    helpfulCount: 8,
  },
  {
    customerName: "ณัฐพล จ.",
    rating: 5,
    title: "สั่งประจำทุกสัปดาห์",
    comment: "เป็นลูกค้าประจำมาปีกว่าแล้ว คุณภาพสม่ำเสมอ พนักงานน่ารักบริการดี",
    daysAgo: 2,
    verifiedPurchase: true,
    helpfulCount: 31,
  },
  {
    customerName: "สุภาพร ว.",
    rating: 5,
    title: "แพ็คเกจสวย เหมาะเป็นของฝาก",
    comment: "ซื้อเป็นของฝากญาติผู้ใหญ่ กล่องสวย ข้างในอร่อยไม่แพ้หน้าตา ประทับใจมาก",
    daysAgo: 21,
    verifiedPurchase: true,
    helpfulCount: 12,
  },
  {
    customerName: "กิตติศักดิ์ อ.",
    rating: 4,
    title: "โอเคเลย ส่งตรงเวลา",
    comment: "สั่งไปทานเองที่บ้าน รสชาติดี เนื้อนุ่ม ส่งตรงเวลาตามนัด",
    daysAgo: 30,
    verifiedPurchase: false,
    helpfulCount: 5,
  },
  {
    customerName: "มณีรัตน์ ห.",
    rating: 5,
    title: "เด็กๆ ที่บ้านชอบมาก",
    comment: "ซื้อให้ลูกๆ ทาน หมดเกลี้ยงภายในวันเดียว จะกลับมาสั่งอีกแน่นอน",
    daysAgo: 6,
    verifiedPurchase: true,
    helpfulCount: 19,
  },
  {
    customerName: "ปิยะดา น.",
    rating: 3,
    title: "รสชาติดีแต่มาช้ากว่านัดนิดหน่อย",
    comment: "รสชาติไม่ผิดหวัง แต่รอบส่งช้ากว่ากำหนดประมาณครึ่งชั่วโมง",
    daysAgo: 40,
    verifiedPurchase: true,
    helpfulCount: 3,
  },
];

function buildReviewsForProduct(productId: string, seedOffset: number): Review[] {
  const count = 3 + (seedOffset % 3);
  return Array.from({ length: count }, (_, i) => {
    const seed = reviewTemplates[(seedOffset + i) % reviewTemplates.length];
    const date = new Date("2026-07-22T00:00:00.000Z");
    date.setUTCDate(date.getUTCDate() - seed.daysAgo - i);
    return {
      id: `review-${productId}-${i + 1}`,
      productId,
      customerName: seed.customerName,
      rating: seed.rating,
      title: seed.title,
      comment: seed.comment,
      createdAt: date.toISOString(),
      verifiedPurchase: seed.verifiedPurchase,
      helpfulCount: seed.helpfulCount,
    };
  });
}

export const reviews: Review[] = products.flatMap((product, index) =>
  buildReviewsForProduct(product.id, index),
);

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}

export function getFeaturedReviews(limit = 6): Review[] {
  const sorted = [...reviews].sort((a, b) => b.helpfulCount - a.helpfulCount);
  const seenTitles = new Set<string>();
  const featured: Review[] = [];

  for (const review of sorted) {
    if (seenTitles.has(review.title)) continue;
    seenTitles.add(review.title);
    featured.push(review);
    if (featured.length === limit) break;
  }

  return featured;
}
