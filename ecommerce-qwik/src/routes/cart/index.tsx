import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import CartContent from '~/components/cart/cart-content';

export default component$(() => {
  return (
    <div class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartContent />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Shopping Cart - TechStore',
  meta: [
    {
      name: 'description',
      content: 'Your shopping cart items',
    },
  ],
};