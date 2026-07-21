"use client";

import { cn } from "@/lib/utils/cn";

interface HeaderIconButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  badgeCount?: number;
  children: React.ReactNode;
}

export function HeaderIconButton({ label, onClick, badgeCount, children }: HeaderIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative rounded-full p-2 text-ink hover:bg-cream-dark/60"
    >
      {children}
      {Boolean(badgeCount) && (
        <span
          className={cn(
            "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream",
          )}
        >
          {badgeCount}
        </span>
      )}
    </button>
  );
}
