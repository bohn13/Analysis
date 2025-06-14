import { component$, $ } from '@builder.io/qwik';
import type { Product } from '~/types';
import { useCartStore } from '~/lib/cart-store';
import { addItemToCart } from '~/lib/cart-actions';

interface AddToCartProps {
  product: Product;
}

export default component$<AddToCartProps>(({ product }) => {
  const store = useCartStore();

  const handleAddToCart = $((event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Викликаємо звичайну функцію (не QRL)
    addItemToCart(store, product);
    
    console.log('Product added to cart:', product.name);
    console.log('Current cart items:', store.cart.items.length);
  });

  return (
    <button
      type="button"
      onClick$={handleAddToCart}
      class="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
    >
      Add to Cart
    </button>
  );
});