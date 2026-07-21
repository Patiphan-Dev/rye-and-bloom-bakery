"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Coupon } from "@/types/cart";
import { readFromStorage, writeToStorage } from "@/lib/utils/storage";
import { availableCoupons } from "@/lib/mock-data/coupons";

const CART_STORAGE_KEY = "bakery.cart.items";
const COUPON_STORAGE_KEY = "bakery.cart.coupon";

interface CartContextValue {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from localStorage, an external source unavailable during SSR
    setItems(readFromStorage(CART_STORAGE_KEY, []));
    setAppliedCoupon(readFromStorage(COUPON_STORAGE_KEY, null));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeToStorage(CART_STORAGE_KEY, items);
  }, [items, isHydrated]);

  useEffect(() => {
    if (isHydrated) writeToStorage(COUPON_STORAGE_KEY, appliedCoupon);
  }, [appliedCoupon, isHydrated]);

  const addItem = (newItem: Omit<CartItem, "cartItemId">) => {
    setItems((current) => {
      const selectionKey = JSON.stringify(newItem.selections);
      const existing = current.find(
        (item) => item.productId === newItem.productId && JSON.stringify(item.selections) === selectionKey,
      );

      if (existing) {
        return current.map((item) =>
          item.cartItemId === existing.cartItemId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...current, { ...newItem, cartItemId: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((current) => current.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((current) => current.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.unitPrice + selectionsTotal(item)) * item.quantity, 0),
    [items],
  );

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const coupon = availableCoupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());

    if (!coupon) {
      return { success: false, message: "ไม่พบรหัสคูปองนี้ กรุณาตรวจสอบอีกครั้ง" };
    }
    if (subtotal < coupon.minimumSpend) {
      return {
        success: false,
        message: `ยอดสั่งซื้อต้องถึง ${coupon.minimumSpend.toLocaleString()} บาท จึงจะใช้คูปองนี้ได้`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `ใช้คูปอง "${coupon.code}" สำเร็จ` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, appliedCoupon, itemCount, subtotal, isHydrated, addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon }}
    >
      {children}
    </CartContext.Provider>
  );
}

function selectionsTotal(item: CartItem): number {
  return item.selections.reduce((sum, selection) => sum + selection.priceDelta, 0);
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
