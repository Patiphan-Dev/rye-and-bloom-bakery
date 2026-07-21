import type { Metadata } from "next";
import { StorySection } from "@/components/about/story-section";
import { OriginSection } from "@/components/about/origin-section";
import { TeamSection } from "@/components/about/team-section";
import { storeInfo } from "@/lib/mock-data/store-info";

export const metadata: Metadata = {
  title: `เกี่ยวกับเรา | ${storeInfo.nameTh}`,
  description: "รู้จักประวัติ จุดเริ่มต้น และทีมงานเบื้องหลังความอร่อยของเรา",
};

export default function AboutPage() {
  return (
    <div>
      <StorySection />
      <OriginSection />
      <TeamSection />
    </div>
  );
}
