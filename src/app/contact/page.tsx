import type { Metadata } from "next";
import { storeInfo } from "@/lib/mock-data/store-info";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ช่องทางการติดต่อ แผนที่ร้าน และเวลาทำการ",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl text-ink">ติดต่อเรา</h1>
        <p className="mt-2 text-sm text-ink-soft">ยินดีให้บริการ ทักหาเราได้ทุกช่องทาง</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <iframe
              title="แผนที่ร้าน"
              src={storeInfo.mapEmbedUrl}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-2xl border border-ink/10 bg-card p-6">
            <h2 className="font-heading text-lg text-ink">ข้อมูลติดต่อ</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>📍 {storeInfo.address}</li>
              <li>📞 โทร: {storeInfo.phone} / {storeInfo.mobile}</li>
              <li>💬 LINE: {storeInfo.lineId}</li>
              <li>✉️ {storeInfo.email}</li>
              <li>
                📘 <a href={storeInfo.facebook} className="text-terracotta hover:underline">Facebook</a>
                {" · "}
                📷 <a href={storeInfo.instagram} className="text-terracotta hover:underline">Instagram</a>
              </li>
            </ul>

            <h3 className="mt-6 font-heading text-base text-ink">เวลาทำการ</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              {storeInfo.businessHours.map((entry) => (
                <li key={entry.day} className="flex justify-between">
                  <span>{entry.day}</span>
                  <span className="font-medium text-ink">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-lg text-ink">ส่งข้อความถึงเรา</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
