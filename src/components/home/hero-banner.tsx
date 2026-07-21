import Image from "next/image";
import Link from "next/link";
import { storeInfo } from "@/lib/mock-data/store-info";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-cream-dark/40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div className="relative z-10">
          <p className="mb-3 inline-block rounded-full bg-terracotta/10 px-4 py-1.5 text-sm font-medium text-terracotta">
            อบสดใหม่ทุกเช้า ไม่ใส่สารกันบูด
          </p>
          <h1 className="font-heading text-4xl leading-tight text-ink sm:text-5xl">
            {storeInfo.tagline}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            ขนมปัง เค้ก เพสตรี้ และของหวานโฮมเมด คัดสรรวัตถุดิบคุณภาพดี ส่งตรงถึงมือคุณทุกวัน
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-md hover:bg-terracotta-dark"
            >
              สั่งซื้อเลย
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink hover:border-terracotta hover:text-terracotta"
            >
              รู้จักเรามากขึ้น
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-moss/20" />
          <Image
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80"
            alt="ขนมปังและเบเกอรี่อบสดใหม่จัดวางบนโต๊ะไม้"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="relative rounded-[2rem] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
