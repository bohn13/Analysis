import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { CartItem } from '~/types';

export interface CartStoreReturn {
  cart: {
    items: CartItem[];
  };
}

export function useCartStore(): CartStoreReturn {
  const cart = useStore<{ items: CartItem[] }>({
    items: [],
  });

  // Завантажити з localStorage
  useVisibleTask$(() => {
    const saved = localStorage.getItem('cart-storage-qwik');
    if (saved) {
      try {
        cart.items = JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse cart from storage:', err);
      }
    }
  });

  // Автоматичне збереження при зміні
  useVisibleTask$(({ track }) => {
    track(() => cart.items);
    localStorage.setItem('cart-storage-qwik', JSON.stringify(cart.items));
  });

  return { cart };
}
