import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/mock-data/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { storeInfo } from "@/lib/mock-data/store-info";

export function InstagramGallerySection() {
  const featured = galleryImages.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={`ติดตามเราที่ Instagram`}
        title={storeInfo.instagram.replace("https://instagram.com/", "@")}
        actionHref="/gallery"
        actionLabel="ดูแกลเลอรีทั้งหมด"
      />
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {featured.map((image) => (
          <Link
            key={image.id}
            href="/gallery"
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 16vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 text-lg text-cream opacity-0 transition-opacity group-hover:bg-ink/30 group-hover:opacity-100">
              📷
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
