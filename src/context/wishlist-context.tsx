"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readFromStorage, writeToStorage } from "@/lib/utils/storage";

const WISHLIST_STORAGE_KEY = "bakery.wishlist.productIds";

interface WishlistContextValue {
  productIds: string[];
  isHydrated: boolean;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from localStorage, an external source unavailable during SSR
    setProductIds(readFromStorage(WISHLIST_STORAGE_KEY, []));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeToStorage(WISHLIST_STORAGE_KEY, productIds);
  }, [productIds, isHydrated]);

  const isWishlisted = (productId: string) => productIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    setProductIds((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  };

  return (
    <WishlistContext.Provider value={{ productIds, isHydrated, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
