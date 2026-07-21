import Image from "next/image";
import { storeInfo } from "@/lib/mock-data/store-info";

export function StorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl md:order-1">
          <Image
            src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1000&q=80"
            alt="หน้าร้านเบเกอรี่ในช่วงเช้า"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-terracotta">ประวัติร้าน</p>
          <h1 className="font-heading text-3xl text-ink sm:text-4xl">เรื่องราวของ {storeInfo.nameTh}</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {storeInfo.nameTh} เริ่มต้นจากความหลงใหลในการอบขนมของครอบครัวเล็กๆ ที่อยากส่งต่อความอร่อยและความอบอุ่นให้กับคนรอบข้าง
            เราเชื่อว่าเบเกอรี่ที่ดีต้องเริ่มจากวัตถุดิบที่ดีและความตั้งใจในทุกขั้นตอนการทำ
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            จากร้านเล็กๆ ที่มีเตาอบเพียงเตาเดียว วันนี้เราเติบโตขึ้นเป็นร้านเบเกอรี่ที่ลูกค้าไว้วางใจ
            แต่สิ่งที่ไม่เคยเปลี่ยนคือความตั้งใจอบขนมทุกชิ้นด้วยใจรัก เหมือนวันแรกที่เราเริ่มต้น
          </p>
        </div>
      </div>
    </section>
  );
}
