import type { Metadata } from "next";
import { galleryImages } from "@/lib/mock-data/gallery";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "แกลเลอรี",
  description: "รวมภาพบรรยากาศร้าน สินค้า และอีเวนต์ต่างๆ ของเรา",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl text-ink">แกลเลอรี</h1>
        <p className="mt-2 text-sm text-ink-soft">รวมภาพบรรยากาศร้าน สินค้า และกิจกรรมของเรา</p>
      </div>
      <GalleryGrid images={galleryImages} />
    </div>
  );
}
