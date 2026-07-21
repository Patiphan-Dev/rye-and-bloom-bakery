export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImageUrl: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discountLabel: string;
  code: string;
  validUntil: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: "store" | "product" | "event";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface StoreHighlight {
  id: string;
  icon: string;
  title: string;
  description: string;
}
