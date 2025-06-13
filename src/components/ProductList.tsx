// src/components/ProductList.tsx
import React from 'react';
import { product } from '../types/product';

interface Props {
  products: product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>
            ₹{product.price}{' '}
            <span className="line-through text-gray-500">₹{product.originalPrice}</span>
          </p>
          <p className="text-green-600 font-bold">{product.discountPercent}% OFF</p>
          <p className="text-sm text-gray-500">Source: {product.source}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
