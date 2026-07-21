"use client";

import { useState } from "react";
import Image from "next/image";
import type { Promotion } from "@/types/content";
import { formatDateThai } from "@/lib/utils/format";

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promotion.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy coupon code", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-card">
      <div className="relative aspect-[16/9]">
        <Image src={promotion.imageUrl} alt={promotion.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-cream">
          {promotion.discountLabel}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg text-ink">{promotion.title}</h3>
        <p className="mt-2 text-sm text-ink-soft">{promotion.description}</p>
        <p className="mt-3 text-xs text-ink-soft/80">ใช้ได้ถึง {formatDateThai(promotion.validUntil)}</p>

        <button
          type="button"
          onClick={handleCopyCode}
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-dashed border-terracotta bg-terracotta/5 px-4 py-2.5 text-sm font-medium text-terracotta"
        >
          <span>{promotion.code}</span>
          <span>{copied ? "คัดลอกแล้ว ✓" : "คัดลอกโค้ด"}</span>
        </button>
      </div>
    </div>
  );
}
