export interface Deal {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
  platform: string;
  buyUrl: string;
  rating: number;
  reviews: number;
}
