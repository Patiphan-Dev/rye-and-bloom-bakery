"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { SearchBar } from "./search-bar";
import { MiniCart } from "./mini-cart";
import { MobileNav } from "./mobile-nav";
import { HeaderIconButton } from "./header-icon-button";
import { primaryNavLinks } from "./nav-links";
import { cn } from "@/lib/utils/cn";
import { storeInfo } from "@/lib/mock-data/store-info";

export function SiteHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { itemCount } = useCart();
  const { productIds } = useWishlist();
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="เปิดเมนู"
            className="rounded-full p-2 text-ink hover:bg-cream-dark/60 xl:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="text-2xl">🍞</span>
            <span className="font-heading text-lg leading-tight text-ink sm:text-xl">{storeInfo.nameTh}</span>
          </Link>

          <nav className="hidden shrink-0 items-center gap-0.5 xl:flex">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-terracotta/10 text-terracotta"
                    : "text-ink-soft hover:bg-cream-dark/60 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
            <SearchBar />
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Link href="/account/wishlist" className="hidden sm:block">
              <HeaderIconButton label="รายการโปรด" badgeCount={productIds.length}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.036l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </HeaderIconButton>
            </Link>
            <Link href="/account">
              <HeaderIconButton label="บัญชีของฉัน">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                </svg>
              </HeaderIconButton>
            </Link>
            <HeaderIconButton label="ตะกร้าสินค้า" onClick={() => setIsCartOpen(true)} badgeCount={itemCount}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.928 2.348-7.5H5.222M7.5 14.25L5.106 5.272M7.5 14.25l-.9-2.4M6.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </HeaderIconButton>
          </div>
        </div>

        <div className="border-t border-ink/10 px-4 py-2 md:hidden">
          <SearchBar />
        </div>
      </header>

      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
