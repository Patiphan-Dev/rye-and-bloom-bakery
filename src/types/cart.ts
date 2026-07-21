export interface CartItemVariantSelection {
  groupId: string;
  groupName: string;
  optionId: string;
  optionLabel: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  selections: CartItemVariantSelection[];
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent: number;
  minimumSpend: number;
}
