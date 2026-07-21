import type { GalleryImage, StoreHighlight, TeamMember } from "@/types/content";

export const galleryImages: GalleryImage[] = [
  { id: "gal-001", url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", alt: "ขนมปังอบสดใหม่บนชั้นวาง", category: "product" },
  { id: "gal-002", url: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80", alt: "หน้าร้านเบเกอรี่ยามเช้า", category: "store" },
  { id: "gal-003", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", alt: "บรรยากาศภายในร้าน", category: "store" },
  { id: "gal-004", url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", alt: "เค้กช็อกโกแลตหน้าตัด", category: "product" },
  { id: "gal-005", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80", alt: "ครัวซองต์เรียงในตะกร้า", category: "product" },
  { id: "gal-006", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", alt: "มุมนั่งทานในร้าน", category: "store" },
  { id: "gal-007", url: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80", alt: "คัพเค้กตกแต่งสีสันสดใส", category: "product" },
  { id: "gal-008", url: "https://images.unsplash.com/photo-1533910534207-90f31029a78e?w=800&q=80", alt: "โดนัทเคลือบน้ำตาลหลากสี", category: "product" },
  { id: "gal-009", url: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80", alt: "อีเวนต์เวิร์กช็อปทำขนมปัง", category: "event" },
  { id: "gal-010", url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80", alt: "ขนมปังหลากชนิดจัดเรียงสวยงาม", category: "product" },
  { id: "gal-011", url: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=800&q=80", alt: "เคาน์เตอร์แคชเชียร์ของร้าน", category: "store" },
  { id: "gal-012", url: "https://images.unsplash.com/photo-1719161148345-c88b05af8186?w=800&q=80", alt: "ขนมปังซาวร์โดว์หน้าตัด", category: "product" },
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-001",
    name: "มินท์ ปัณฑิตา",
    role: "หัวหน้าเชฟและผู้ก่อตั้ง",
    bio: "เรียนจบด้านการทำขนมอบจากฝรั่งเศส กลับมาก่อตั้งร้านด้วยความตั้งใจอยากให้คนไทยได้ทานเบเกอรี่คุณภาพระดับสากลในราคาที่เข้าถึงได้",
    imageUrl: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=80",
  },
  {
    id: "team-002",
    name: "กอล์ฟ ธีรภัทร",
    role: "เชฟเบเกอรี่",
    bio: "ผู้เชี่ยวชาญด้านขนมปังหมักธรรมชาติ ดูแลหัวเชื้อซาวร์โดว์ของร้านมากว่า 3 ปี",
    imageUrl: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&q=80",
  },
  {
    id: "team-003",
    name: "แนน ศิริพร",
    role: "เชฟตกแต่งเค้ก",
    bio: "รับผิดชอบงานตกแต่งเค้กทุกชิ้น เชี่ยวชาญงานเค้กสั่งทำพิเศษสำหรับทุกโอกาส",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
];

export const storeHighlights: StoreHighlight[] = [
  { id: "hl-001", icon: "🌾", title: "วัตถุดิบคัดสรร", description: "เลือกใช้แป้ง เนย และนมคุณภาพดีจากแหล่งผลิตที่ไว้ใจได้" },
  { id: "hl-002", icon: "🔥", title: "อบสดใหม่ทุกวัน", description: "ทุกชิ้นอบสดใหม่ในแต่ละวัน ไม่มีการเก็บค้างคืน" },
  { id: "hl-003", icon: "🚫", title: "ไม่ใส่สารกันบูด", description: "ปลอดภัยต่อสุขภาพ เน้นความสดใหม่มากกว่าอายุการเก็บรักษา" },
  { id: "hl-004", icon: "🚴", title: "จัดส่งรวดเร็ว", description: "บริการจัดส่งถึงมือภายในวันเดียวสำหรับพื้นที่กรุงเทพฯ" },
];
