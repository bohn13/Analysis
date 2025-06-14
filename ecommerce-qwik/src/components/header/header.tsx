import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { ShoppingCartIcon } from 'lucide-qwik';
import { useCartStore } from '~/lib/cart-store';

export default component$(() => {
  const store = useCartStore();
  const cartItemsCount = useSignal(0);

  // Підраховуємо кількість товарів при оновленні кошика
  useVisibleTask$(() => {
    cartItemsCount.value = store.cart.items.reduce((total, item) => total + item.quantity, 0);
  });

  return (
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" class="flex items-center space-x-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white">
              <ShoppingCartIcon class="h-5 w-5" />
            </div>
            <span class="text-xl font-bold text-gray-900">TechStore</span>
          </Link>

          {/* Navigation */}
          <nav class="hidden md:flex items-center space-x-8">
            <Link href="/" class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link href="/cart" class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Cart
            </Link>
          </nav>

          {/* Cart Icon with Counter */}
          <Link 
            href="/cart" 
            class="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCartIcon class="h-6 w-6 text-gray-700" />
            {cartItemsCount.value > 0 && (
              <span class="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartItemsCount.value}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
});