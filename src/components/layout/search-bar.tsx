"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "@/lib/mock-data/products";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(trimmed) || product.shortDescription.toLowerCase().includes(trimmed),
      )
      .slice(0, 5);
  }, [query]);

  const showDropdown = isFocused && query.trim().length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="ค้นหาขนมปัง เค้ก เพสตรี้..."
          aria-label="ค้นหาสินค้า"
          className="w-full rounded-full border border-ink/15 bg-card py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
        />
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z" />
        </svg>
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-ink/10 bg-card shadow-xl">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-ink-soft">ไม่พบสินค้าที่ตรงกับ &ldquo;{query}&rdquo;</p>
          ) : (
            <ul>
              {results.map((product) => (
                <li key={product.id} className="border-b border-ink/5 last:border-none">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-cream-dark/50"
                  >
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{product.name}</span>
                      <span className="block text-xs text-terracotta">{formatCurrency(product.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  className="block p-3 text-center text-sm font-medium text-terracotta hover:bg-cream-dark/50"
                >
                  ดูผลการค้นหาทั้งหมด →
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
