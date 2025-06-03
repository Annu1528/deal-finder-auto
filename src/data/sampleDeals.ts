import { Product } from '../types/Product';

export const sampleDeals: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    category: 'Electronics',
    imageUrl: 'https://via.placeholder.com/150',
    source: 'Amazon',
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: 'Footwear',
    imageUrl: 'https://via.placeholder.com/150',
    source: 'Flipkart',
  },
];
