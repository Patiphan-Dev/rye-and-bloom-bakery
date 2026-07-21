const milestones = [
  { year: "2564", title: "จุดเริ่มต้น", description: "เริ่มอบขนมปังขายในตลาดนัดสุดสัปดาห์ด้วยเตาอบที่บ้าน" },
  { year: "2565", title: "เปิดหน้าร้านแรก", description: "ขยับขยายมาเปิดหน้าร้านเล็กๆ ย่านสุขุมวิท พร้อมเมนูเค้กและเพสตรี้" },
  { year: "2566", title: "ขยายทีมงาน", description: "รับเชฟผู้เชี่ยวชาญเข้าร่วมทีม พัฒนาสูตรซาวร์โดว์และเค้กพิเศษ" },
  { year: "2568", title: "เปิดบริการสั่งซื้อออนไลน์", description: "เริ่มให้บริการสั่งซื้อและจัดส่งทั่วกรุงเทพฯ และปริมณฑล" },
];

export function OriginSection() {
  return (
    <section className="bg-cream-dark/30 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-wide text-terracotta">จุดเริ่มต้น</p>
        <h2 className="text-center font-heading text-2xl text-ink sm:text-3xl">เส้นทางของเรา</h2>

        <div className="mt-10 space-y-8 border-l-2 border-terracotta/30 pl-6">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="relative">
              <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-terracotta" />
              <p className="text-sm font-semibold text-terracotta">{milestone.year}</p>
              <h3 className="mt-1 font-heading text-lg text-ink">{milestone.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
