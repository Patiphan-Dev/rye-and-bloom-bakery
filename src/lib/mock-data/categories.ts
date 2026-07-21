import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "cat-bread",
    slug: "bread",
    name: "ขนมปัง",
    description: "ขนมปังอบสดใหม่ทุกเช้า จากแป้งหมักธรรมชาติ",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
  },
  {
    id: "cat-cake",
    slug: "cake",
    name: "เค้ก",
    description: "เค้กเนื้อนุ่มละมุน สำหรับทุกโอกาสพิเศษ",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
  },
  {
    id: "cat-pastry",
    slug: "pastry",
    name: "เพสตรี้",
    description: "ครัวซองต์และเพสตรี้เนยแท้ กรอบนอกนุ่มใน",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
  },
  {
    id: "cat-cookie",
    slug: "cookie",
    name: "คุกกี้",
    description: "คุกกี้โฮมเมด หอมเนยสดทุกชิ้น",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
  },
  {
    id: "cat-cupcake",
    slug: "cupcake",
    name: "คัพเค้ก",
    description: "คัพเค้กหน้าตาน่ารัก หวานกำลังดี",
    imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80",
  },
  {
    id: "cat-donut",
    slug: "donut",
    name: "โดนัท",
    description: "โดนัทเนื้อนุ่ม เคลือบหลากรส",
    imageUrl: "https://images.unsplash.com/photo-1533910534207-90f31029a78e?w=800&q=80",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
