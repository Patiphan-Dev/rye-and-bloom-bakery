export interface Review {
  id: string;
  productId?: string;
  customerName: string;
  customerAvatarUrl?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}
