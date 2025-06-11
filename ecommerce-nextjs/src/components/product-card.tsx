'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking button
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg border hover:shadow-md transition-shadow p-4">
        <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}