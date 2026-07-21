"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";
import { MemberProvider } from "./member-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MemberProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </MemberProvider>
  );
}
