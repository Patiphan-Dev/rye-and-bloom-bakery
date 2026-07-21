"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { ShopFilters } from "./shop-filters";
import { ShopToolbar } from "./shop-toolbar";
import { Pagination } from "./pagination";
import { InfiniteScrollSentinel } from "./infinite-scroll-sentinel";
import { Drawer } from "@/components/ui/drawer";
import { defaultFilters, filterProducts, sortProducts, type ProductFilters, type SortOption } from "@/lib/utils/product-filters";
import { getCategoryBySlug } from "@/lib/mock-data/categories";

const PAGE_SIZE = 8;

export function ShopExplorer({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"pagination" | "infinite">("pagination");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const queryParam = searchParams.get("q") ?? "";
    const categoryParam = searchParams.get("category");
    const category = categoryParam ? getCategoryBySlug(categoryParam) : undefined;

    // Syncs from an external source (the URL) into local filter state, e.g. when
    // a header search or category link navigates here with new query params.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters((current) => ({
      ...current,
      query: queryParam,
      categoryIds: category ? [category.id] : current.categoryIds,
    }));
  }, [searchParams]);

  const filteredAndSorted = useMemo(
    () => sortProducts(filterProducts(allProducts, filters), sort),
    [allProducts, filters, sort],
  );

  // Reset pagination whenever the result set changes shape (filters/sort/view).
  // Adjusted directly during render (React's recommended pattern for derived
  // state resets) instead of an effect, to avoid an extra post-mount render.
  const resetKey = JSON.stringify(filters) + sort + viewMode;
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setCurrentPage(1);
    setVisibleCount(PAGE_SIZE);
  }

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const paginatedProducts = filteredAndSorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const infiniteProducts = filteredAndSorted.slice(0, visibleCount);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, filteredAndSorted.length));
  }, [filteredAndSorted.length]);

  const productsToRender = viewMode === "pagination" ? paginatedProducts : infiniteProducts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <ShopFilters filters={filters} onChange={setFilters} />
        </div>

        <div>
          <ShopToolbar
            resultCount={filteredAndSorted.length}
            sort={sort}
            onSortChange={setSort}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />

          {productsToRender.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink/20 py-20 text-center text-ink-soft">
              ไม่พบสินค้าที่ตรงกับเงื่อนไขที่เลือก ลองปรับตัวกรองใหม่อีกครั้ง
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {productsToRender.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {viewMode === "pagination" ? (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          ) : (
            <InfiniteScrollSentinel onIntersect={handleLoadMore} hasMore={visibleCount < filteredAndSorted.length} />
          )}
        </div>
      </div>

      <Drawer isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} side="left" title="ตัวกรองสินค้า">
        <div className="p-5">
          <ShopFilters filters={filters} onChange={setFilters} />
        </div>
      </Drawer>
    </div>
  );
}
