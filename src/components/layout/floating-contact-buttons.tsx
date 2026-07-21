"use client";

import { useState } from "react";
import { storeInfo } from "@/lib/mock-data/store-info";
import { cn } from "@/lib/utils/cn";

const channels = [
  { key: "line", label: "แชทผ่าน LINE", icon: "💬", href: `https://line.me/ti/p/~${storeInfo.lineId}`, color: "bg-[#06C755]" },
  { key: "messenger", label: "แชทผ่าน Messenger", icon: "📩", href: storeInfo.facebook, color: "bg-[#0084FF]" },
  { key: "phone", label: "โทรหาเรา", icon: "📞", href: `tel:${storeInfo.mobile}`, color: "bg-terracotta" },
] as const;

export function FloatingContactButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-200",
          isExpanded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {channels.map((channel) => (
          <a
            key={channel.key}
            href={channel.href}
            target={channel.key === "phone" ? undefined : "_blank"}
            rel="noreferrer"
            className={cn(
              "flex items-center gap-2 rounded-full py-2 pl-4 pr-3 text-sm font-medium text-white shadow-lg",
              channel.color,
            )}
          >
            {channel.label}
            <span className="text-lg">{channel.icon}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? "ปิดช่องทางติดต่อ" : "เปิดช่องทางติดต่อ"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-2xl text-white shadow-xl hover:bg-terracotta-dark"
      >
        {isExpanded ? "✕" : "💬"}
      </button>
    </div>
  );
}
