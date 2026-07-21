"use client";

import type { SortOption } from "@/lib/utils/product-filters";
import { cn } from "@/lib/utils/cn";

const sortLabels: Record<SortOption, string> = {
  newest: "มาใหม่ล่าสุด",
  "price-asc": "ราคา: น้อยไปมาก",
  "price-desc": "ราคา: มากไปน้อย",
  "best-selling": "ขายดีที่สุด",
  rating: "คะแนนสูงสุด",
};

interface ShopToolbarProps {
  resultCount: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: "pagination" | "infinite";
  onViewModeChange: (mode: "pagination" | "infinite") => void;
  onOpenFilters: () => void;
}

export function ShopToolbar({ resultCount, sort, onSortChange, viewMode, onViewModeChange, onOpenFilters }: ShopToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:border-terracotta hover:text-terracotta lg:hidden"
        >
          ตัวกรอง
        </button>
        <p className="text-sm text-ink-soft">พบ {resultCount} รายการ</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex rounded-full border border-ink/15 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => onViewModeChange("pagination")}
            className={cn(
              "rounded-full px-3 py-1.5 font-medium",
              viewMode === "pagination" ? "bg-terracotta text-cream" : "text-ink-soft",
            )}
          >
            แบ่งหน้า
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("infinite")}
            className={cn(
              "rounded-full px-3 py-1.5 font-medium",
              viewMode === "infinite" ? "bg-terracotta text-cream" : "text-ink-soft",
            )}
          >
            เลื่อนโหลดอัตโนมัติ
          </button>
        </div>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          aria-label="เรียงลำดับสินค้า"
          className="rounded-full border border-ink/15 bg-card px-4 py-2 text-sm text-ink focus:border-terracotta focus:outline-none"
        >
          {Object.entries(sortLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
