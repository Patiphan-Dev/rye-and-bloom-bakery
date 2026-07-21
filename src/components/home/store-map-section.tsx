import { storeInfo } from "@/lib/mock-data/store-info";
import { SectionHeading } from "@/components/ui/section-heading";

export function StoreMapSection() {
  return (
    <section className="bg-moss/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="แวะมาหาเรา" title="แผนที่ร้านและเวลาทำการ" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
            <iframe
              title="แผนที่ร้าน"
              src={storeInfo.mapEmbedUrl}
              className="h-72 w-full md:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-ink/10 bg-card p-6">
            <div>
              <h3 className="font-heading text-lg text-ink">ที่อยู่ร้าน</h3>
              <p className="mt-1 text-sm text-ink-soft">{storeInfo.address}</p>
            </div>
            <div>
              <h3 className="font-heading text-lg text-ink">เวลาทำการ</h3>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                {storeInfo.businessHours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-4">
                    <span>{entry.day}</span>
                    <span className="font-medium text-ink">{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
