export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: string;
  imageUrl: string;
  source: 'Amazon' | 'Flipkart' | 'Other';
}
