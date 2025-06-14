import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { useCartStore } from '~/lib/cart-store';
import {
  updateItemQuantity,
  removeItemFromCart
} from '~/lib/cart-actions';

export default component$(() => {
  const {cart} = useCartStore();
  const totalPrice = useSignal(0);

  useVisibleTask$(() => {
    totalPrice.value = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  });

const handleUpdate = $((productId: string, quantity: number) => {
  const { cart } = useCartStore();
  updateItemQuantity({ cart }, productId, quantity);
});

const handleRemove = $((productId: string) => {
  const { cart } = useCartStore();
  removeItemFromCart({ cart }, productId);
});


  if (cart.items.length === 0) {
    return (
      <div class="text-center py-16">
        <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          href="/"
          class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
          class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors block text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
});
