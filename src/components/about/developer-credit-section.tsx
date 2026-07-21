import { storeInfo } from "@/lib/mock-data/store-info";

export function DeveloperCreditSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-terracotta">เกี่ยวกับเว็บไซต์นี้</p>
      <h2 className="mt-2 font-heading text-2xl text-ink">ออกแบบและพัฒนาโดย {storeInfo.credit.developer}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        เว็บไซต์นี้เป็นเว็บตัวอย่างเพื่อการสาธิต (demo) สร้างขึ้นเพื่อแสดงตัวอย่างเว็บไซต์ร้านเบเกอรี่ครบวงจร
        ข้อมูลร้านค้า สินค้า และรีวิวทั้งหมดเป็นข้อมูลจำลอง
      </p>
      <a
        href={`mailto:${storeInfo.credit.email}`}
        className="mt-4 inline-block text-sm font-medium text-terracotta hover:underline"
      >
        {storeInfo.credit.email}
      </a>
    </section>
  );
}
