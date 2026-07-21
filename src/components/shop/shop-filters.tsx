"use client";

import { categories } from "@/lib/mock-data/categories";
import type { ProductFilters } from "@/lib/utils/product-filters";
import { formatCurrency } from "@/lib/utils/format";

interface ShopFiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

export function ShopFilters({ filters, onChange }: ShopFiltersProps) {
  const toggleCategory = (categoryId: string) => {
    const isSelected = filters.categoryIds.includes(categoryId);
    onChange({
      ...filters,
      categoryIds: isSelected
        ? filters.categoryIds.filter((id) => id !== categoryId)
        : [...filters.categoryIds, categoryId],
    });
  };

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="font-heading text-base text-ink">หมวดหมู่สินค้า</h3>
        <ul className="mt-3 space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={filters.categoryIds.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="h-4 w-4 rounded border-ink/30 text-terracotta focus:ring-terracotta"
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-heading text-base text-ink">ช่วงราคา</h3>
        <div className="mt-3 flex items-center justify-between text-sm text-ink-soft">
          <span>{formatCurrency(filters.minPrice)}</span>
          <span>{formatCurrency(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={filters.maxPrice}
          onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
          className="mt-2 w-full accent-terracotta"
        />
      </div>

      <div>
        <h3 className="font-heading text-base text-ink">ตัวกรองเพิ่มเติม</h3>
        <label className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={filters.bestSellerOnly}
            onChange={(event) => onChange({ ...filters, bestSellerOnly: event.target.checked })}
            className="h-4 w-4 rounded border-ink/30 text-terracotta focus:ring-terracotta"
          />
          เฉพาะสินค้าขายดี
        </label>
      </div>
    </aside>
  );
}
