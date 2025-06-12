'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`}>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </div>
  );
}