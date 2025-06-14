import { component$, useComputed$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { ShoppingCartIcon } from 'lucide-qwik';
import { useCart } from '~/lib/cart-context';
import { getTotalItems } from '~/lib/cart-actions';

export default component$(() => {
  const cart = useCart();

  // useComputed$ для Resumability - автоматично перерахує при зміні cart.items
  const totalItems = useComputed$(() => getTotalItems(cart));

  return (
    <Link 
      href="/cart" 
      class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <ShoppingCartIcon class="w-6 h-6" />
      {totalItems.value > 0 && (
        <span class="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {totalItems.value}
        </span>
      )}
    </Link>
  );
});