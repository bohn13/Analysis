import { 
  createContextId, 
  useContext, 
  useContextProvider, 
  useStore, 
  useVisibleTask$,
  type Signal
} from '@builder.io/qwik';
import type { CartItem } from '~/types';

export interface CartState {
  items: CartItem[];
}

export const CartContext = createContextId<CartState>('cart-context');

export const useCartProvider = () => {
  const cart = useStore<CartState>({
    items: [],
  });

  useVisibleTask$(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('qwik-cart-resumability');
        if (saved) {
          const data = JSON.parse(saved);
          cart.items = data.items || [];
        }
      } catch (err) {
        console.error('Failed to load cart from storage:', err);
      }
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => cart.items);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('qwik-cart-resumability', JSON.stringify({ items: cart.items }));
      } catch (err) {
        console.error('Failed to save cart to storage:', err);
      }
    }
  });

  useContextProvider(CartContext, cart);
  return cart;
};


export const useCart = () => {
  return useContext(CartContext);
};