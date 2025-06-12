'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export function CartButton() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Link 
      href="/cart" 
      className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}