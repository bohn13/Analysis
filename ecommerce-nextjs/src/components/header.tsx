import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { CartButton } from './cart-button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">TechStore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Cart
            </Link>
          </nav>

          <CartButton />
        </div>
      </div>
    </header>
  );
}