import Link from "next/link";
import { primaryNavLinks } from "./nav-links";
import { storeInfo } from "@/lib/mock-data/store-info";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-cream-dark/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍞</span>
            <span className="font-heading text-xl text-ink">{storeInfo.nameTh}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            {storeInfo.tagline} — เบเกอรี่โฮมเมดที่ตั้งใจคัดสรรวัตถุดิบคุณภาพดี อบสดใหม่ทุกวันเพื่อส่งต่อความอร่อยถึงมือคุณ
          </p>
          {storeInfo.isPlaceholder && (
            <p className="mt-3 text-xs text-terracotta">* ข้อมูลติดต่อเป็นตัวอย่างสำหรับสาธิตเว็บไซต์ แก้ไขได้ภายหลัง</p>
          )}
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">เมนูลัด</h3>
          <ul className="mt-3 space-y-2">
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft hover:text-terracotta">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">ติดต่อเรา</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>📍 {storeInfo.address}</li>
            <li>📞 {storeInfo.phone}</li>
            <li>💬 LINE: {storeInfo.lineId}</li>
            <li>✉️ {storeInfo.email}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={storeInfo.facebook} className="rounded-full bg-cream p-2 text-ink-soft hover:text-terracotta" aria-label="Facebook">
              <span className="text-lg">📘</span>
            </a>
            <a href={storeInfo.instagram} className="rounded-full bg-cream p-2 text-ink-soft hover:text-terracotta" aria-label="Instagram">
              <span className="text-lg">📷</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 py-5 text-center text-xs text-ink-soft/80">
        © 2026 {storeInfo.nameTh}. เว็บไซต์นี้เป็นตัวอย่างเพื่อการสาธิต ข้อมูลทั้งหมดเป็นข้อมูลจำลอง
        <br className="sm:hidden" />
        <span className="sm:ml-1">
          Developed by{" "}
          <a href={`mailto:${storeInfo.credit.email}`} className="font-medium text-terracotta hover:underline">
            {storeInfo.credit.developer}
          </a>
        </span>
      </div>
    </footer>
  );
}
