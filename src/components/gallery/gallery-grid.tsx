"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/content";
import { cn } from "@/lib/utils/cn";

const categoryLabels: Record<GalleryImage["category"] | "all", string> = {
  all: "ทั้งหมด",
  store: "บรรยากาศร้าน",
  product: "สินค้า",
  event: "อีเวนต์",
};

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryImage["category"] | "all">("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(
    () => (activeCategory === "all" ? images : images.filter((image) => image.category === activeCategory)),
    [images, activeCategory],
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {(Object.keys(categoryLabels) as (GalleryImage["category"] | "all")[]).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium",
              activeCategory === category ? "border-terracotta bg-terracotta text-cream" : "border-ink/15 text-ink-soft",
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {filteredImages.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxImage(image)}
            className="relative block w-full overflow-hidden rounded-xl"
          >
            <Image src={image.url} alt={image.alt} width={400} height={400} className="w-full object-cover" />
          </button>
        ))}
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label="ปิดรูปภาพ"
            className="absolute right-5 top-5 rounded-full bg-cream/90 p-2 text-ink"
          >
            ✕
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-3xl">
            <Image src={lightboxImage.url} alt={lightboxImage.alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
