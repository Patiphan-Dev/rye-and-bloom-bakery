"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils/cn";

type TabKey = "description" | "ingredients" | "storage";

export function ProductInfoTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "รายละเอียดสินค้า" },
    { key: "ingredients", label: "ส่วนผสม" },
    { key: "storage", label: "การเก็บรักษา" },
  ];

  return (
    <div className="mt-12">
      <div className="flex gap-2 border-b border-ink/10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "border-b-2 px-4 py-3 text-sm font-medium",
              activeTab === tab.key ? "border-terracotta text-terracotta" : "border-transparent text-ink-soft",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm leading-relaxed text-ink-soft">
        {activeTab === "description" && <p>{product.description}</p>}

        {activeTab === "ingredients" && (
          <ul className="list-inside list-disc space-y-1">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        )}

        {activeTab === "storage" && (
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-ink">วิธีเก็บรักษา</dt>
              <dd className="mt-1">{product.storageInstructions}</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">อายุการเก็บรักษา</dt>
              <dd className="mt-1">{product.shelfLifeDays} วัน</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">น้ำหนัก</dt>
              <dd className="mt-1">{product.weightGrams} กรัม</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
