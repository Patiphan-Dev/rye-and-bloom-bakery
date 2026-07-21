import { storeHighlights } from "@/lib/mock-data/gallery";
import { SectionHeading } from "@/components/ui/section-heading";

export function StoreHighlights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="ทำไมต้องเรา" title="จุดเด่นของร้านเรา" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {storeHighlights.map((highlight) => (
          <div key={highlight.id} className="rounded-2xl border border-ink/10 bg-card p-6 text-center">
            <span className="text-4xl">{highlight.icon}</span>
            <h3 className="mt-3 font-heading text-base text-ink">{highlight.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{highlight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
