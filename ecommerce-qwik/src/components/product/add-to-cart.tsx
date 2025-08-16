import { component$, $ } from '@builder.io/qwik';
import type { Product } from '~/types';
import { useCart } from '~/lib/cart-context';
import { addItemToCart } from '~/lib/cart-actions';

interface AddToCartProps {
  product: Product;
  variant?: 'small' | 'large';
}

export default component$<AddToCartProps>(({ product, variant = 'small' }) => {
  const cart = useCart();

  const handleAddToCart = $(async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    
    await addItemToCart(cart, product);
    
    console.log('Product added to cart:', product.name);
    console.log('Current cart items:', cart.items.length);
  });

  const buttonClasses = variant === 'large' 
    ? "bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
    : "bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer";

  return (
    <button
      type="button"
      onClick$={handleAddToCart}
      class={buttonClasses}
      aria-label={`Add ${product.name} to cart`}
    >
      Add to Cart
    </button>
  );
});