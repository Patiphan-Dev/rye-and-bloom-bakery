"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils/cn";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const activeImage = images[activeIndex];

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsZoomOpen(true)}
        className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-cream-dark/30"
        aria-label="ขยายดูรูปภาพสินค้า"
      >
        <Image
          src={activeImage.url}
          alt={activeImage.alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-3 py-1 text-xs text-cream opacity-0 transition-opacity group-hover:opacity-100">
          🔍 คลิกเพื่อซูม
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2",
                index === activeIndex ? "border-terracotta" : "border-transparent",
              )}
              aria-label={`ดูรูปที่ ${index + 1}`}
            >
              <Image src={image.url} alt={image.alt} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="ปิดรูปขยาย"
            className="absolute right-5 top-5 rounded-full bg-cream/90 p-2 text-ink"
          >
            ✕
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-3xl">
            <Image src={activeImage.url} alt={activeImage.alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
