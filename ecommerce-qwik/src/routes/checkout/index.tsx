import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useCart } from '~/lib/cart-context';
import { clearCart, getTotalPrice } from '~/lib/cart-actions';

export default component$(() => {
  const nav = useNavigate();
  const isProcessing = useSignal(false);
  const cart = useCart();

  // useComputed$ для Resumability
  const totalPrice = useComputed$(() => getTotalPrice(cart));

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    isProcessing.value = true;
    
    // Симуляція обробки замовлення
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await clearCart(cart);

    alert('Order placed successfully!');
    await nav('/');
  });

  // Порожній кошик - ідентичний до Next.js
  if (cart.items.length === 0) {
    return (
      <div class="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold mb-4">No items to checkout</h1>
        <button
          onClick$={async () => await nav('/')}
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form - ідентичний до Next.js */}
        <div class="bg-white p-6 rounded-lg border">
          <h2 class="text-xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit$={handleSubmit} class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                class="w-full border rounded-lg px-3 py-2"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                class="w-full border rounded-lg px-3 py-2"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                required
                class="w-full border rounded-lg px-3 py-2"
                placeholder="123 Main St"
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  required
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="New York"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="10001"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isProcessing.value}
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isProcessing.value ? 'Processing...' : `Place Order - $${totalPrice.value.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary - ідентичний до Next.js */}
        <div class="bg-white p-6 rounded-lg border">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-3 mb-4">
            {cart.items.map((item) => (
              <div key={item.product.id} class="flex justify-between">
                <span>{item.product.name} x{item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div class="border-t pt-4">
            <div class="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice.value.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
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