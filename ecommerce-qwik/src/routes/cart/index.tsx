import { component$, useComputed$, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useCart } from '~/lib/cart-context';
import {
  updateItemQuantity,
  removeItemFromCart,
  getTotalPrice
} from '~/lib/cart-actions';

export default component$(() => {
  const cart = useCart();

  // useComputed$ для Resumability - автоматично перерахує при зміні cart.items
  const totalPrice = useComputed$(() => getTotalPrice(cart));

  const handleUpdate = $(async (productId: string, quantity: number) => {
    await updateItemQuantity(cart, productId, quantity);
  });

  const handleRemove = $(async (productId: string) => {
    await removeItemFromCart(cart, productId);
  });

  // Порожній кошик - ідентичний до Next.js
  if (cart.items.length === 0) {
    return (
      <div class="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link 
          href="/" 
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - ідентичний до Next.js */}
        <div class="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.product.id} class="bg-white p-4 rounded-lg border">
              <div class="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  class="w-20 h-20 rounded-lg object-cover"
                  width={80}
                  height={80}
                />
                
                <div class="flex-1">
                  <h3 class="font-medium">{item.product.name}</h3>
                  <p class="text-gray-600">${item.product.price}</p>
                </div>
                
                <div class="flex items-center space-x-2">
                  <button
                    onClick$={() => handleUpdate(item.product.id, item.quantity - 1)}
                    class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span class="px-3">{item.quantity}</span>
                  <button
                    onClick$={() => handleUpdate(item.product.id, item.quantity + 1)}
                    class="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick$={() => handleRemove(item.product.id)}
                  class="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - ідентичний до Next.js */}
        <div class="bg-white p-6 rounded-lg border h-fit">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice.value.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div class="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>${totalPrice.value.toFixed(2)}</span>
            </div>
          </div>
          
          <Link
            href="/checkout"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors block text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
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