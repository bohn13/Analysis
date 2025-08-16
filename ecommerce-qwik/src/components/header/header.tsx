import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { ShoppingCartIcon } from 'lucide-qwik';
import CartButton from '~/components/cart/cart-button';

export default component$(() => {
  return (
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <Link href="/" class="flex items-center space-x-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShoppingCartIcon class="h-5 w-5" />
            </div>
            <span class="text-xl font-bold text-gray-900">TechStore</span>
          </Link>

          <nav class="hidden md:flex items-center space-x-8">
            <Link href="/" class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link href="/cart" class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Cart
            </Link>
          </nav>

          <CartButton />
        </div>
      </div>
    </header>
  );
});