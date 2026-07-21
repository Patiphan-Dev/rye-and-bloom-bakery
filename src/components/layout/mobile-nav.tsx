"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@/components/ui/drawer";
import { primaryNavLinks } from "./nav-links";
import { cn } from "@/lib/utils/cn";
import { storeInfo } from "@/lib/mock-data/store-info";

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" title={storeInfo.nameTh}>
      <nav className="flex flex-col px-2 py-4">
        {primaryNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "rounded-xl px-4 py-3 text-base font-medium",
              pathname === link.href ? "bg-terracotta/10 text-terracotta" : "text-ink hover:bg-cream-dark/60",
            )}
          >
            {link.label}
          </Link>
        ))}
        <div className="my-2 border-t border-ink/10" />
        <Link href="/account" onClick={onClose} className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-cream-dark/60">
          บัญชีของฉัน
        </Link>
      </nav>
    </Drawer>
  );
}
