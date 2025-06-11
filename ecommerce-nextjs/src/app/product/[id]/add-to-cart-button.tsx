'use client';

import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
    >
      Add to Cart
    </button>
  );
}