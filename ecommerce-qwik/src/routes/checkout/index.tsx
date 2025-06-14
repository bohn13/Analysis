import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import CheckoutPage from '~/components/checkout/checkout-page';

export default component$(() => {
  return (
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutPage />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Checkout - TechStore',
  meta: [
    {
      name: 'description',
      content: 'Complete your order',
    },
  ],
};