"use client";

import { useEffect, useRef } from "react";

export function InfiniteScrollSentinel({ onIntersect, hasMore }: { onIntersect: () => void; hasMore: boolean }) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect();
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onIntersect, hasMore]);

  return (
    <div ref={sentinelRef} className="flex h-16 items-center justify-center text-sm text-ink-soft">
      {hasMore ? "กำลังโหลดสินค้าเพิ่มเติม..." : "แสดงสินค้าครบทุกรายการแล้ว"}
    </div>
  );
}
