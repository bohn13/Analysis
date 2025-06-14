import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useCart } from '~/lib/cart-context';
import { clearCart, getTotalPrice } from '~/lib/cart-actions';

export default component$(() => {
  const nav = useNavigate();
  const isProcessing = useSignal(false);
  const cart = useCart();

  // useComputed$ для Resumability
  const total = useComputed$(() => getTotalPrice(cart));

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    isProcessing.value = true;

    // Симуляція обробки замовлення
    await new Promise(resolve => setTimeout(resolve, 2000));

    await clearCart(cart);

    alert('Order placed successfully!');
    await nav('/');
  });

  if (cart.items.length === 0) {
    return (
      <div class="text-center py-16">
        <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Add some products to proceed with checkout</p>
        <a
          href="/"
          class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Shipping Form */}
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-bold mb-4">Shipping Information</h2>
        <form onSubmit$={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing.value}
            class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isProcessing.value
              ? 'Processing...'
              : `Place Order - $${total.value.toFixed(2)}`}
          </button>
        </form>
      </div>

      {/* Order Summary */}
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
            <span>${total.value.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
});