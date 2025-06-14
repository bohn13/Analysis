import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../lib/cart-store';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <a 
      href="/cart" 
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
    >
      <ShoppingCart className="h-5 w-5" />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-medium text-white">
          {totalItems}
        </span>
      )}
    </a>
  );
}