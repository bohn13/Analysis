'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';

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
    <div className="group relative h-full">
      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="relative flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col flex-1 p-4 pb-14"> {/* p-4 for spacing, pb-14 for button space */}
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                {product.category}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
}
