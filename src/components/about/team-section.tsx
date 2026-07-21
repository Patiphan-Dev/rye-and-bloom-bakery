import Image from "next/image";
import { teamMembers } from "@/lib/mock-data/gallery";
import { SectionHeading } from "@/components/ui/section-heading";

export function TeamSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="คนเบื้องหลังความอร่อย" title="ทีมงานของเรา" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-card">
            <div className="relative aspect-[4/3]">
              <Image src={member.imageUrl} alt={member.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg text-ink">{member.name}</h3>
              <p className="text-sm font-medium text-terracotta">{member.role}</p>
              <p className="mt-2 text-sm text-ink-soft">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
