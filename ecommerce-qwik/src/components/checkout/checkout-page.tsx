import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { useCartStore } from '~/lib/cart-store';
import { clearCart, getTotalPrice } from '~/lib/cart-actions';

export default component$(() => {
  const nav = useNavigate();
  const isProcessing = useSignal(false);

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    isProcessing.value = true;

    // Отримуємо cart всередині QRL
    const store = useCartStore();
    await clearCart(store);

    alert('Order placed successfully!');
    nav('/');
  });

  const store = useCartStore();
  const items = store.cart.items;
  const total = getTotalPrice(store);

  return (
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Shipping Form */}
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-bold mb-4">Shipping Information</h2>
        <form onSubmit$={handleSubmit} class="space-y-4">
          {/* ...input fields... */}
          <button
            type="submit"
            disabled={isProcessing.value}
            class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isProcessing.value
              ? 'Processing...'
              : `Place Order - $${total.toFixed(2)}`}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-bold mb-4">Order Summary</h2>
        <div class="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.product.id} class="flex justify-between">
              <span>{item.product.name} x{item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div class="border-t pt-4">
          <div class="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
