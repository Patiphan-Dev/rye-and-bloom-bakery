export interface NavLink {
  href: string;
  label: string;
}

export const primaryNavLinks: NavLink[] = [
  { href: "/", label: "หน้าแรก" },
  { href: "/shop", label: "ร้านค้า" },
  { href: "/promotions", label: "โปรโมชั่น" },
  { href: "/blog", label: "บล็อก" },
  { href: "/gallery", label: "แกลเลอรี" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อ" },
];
