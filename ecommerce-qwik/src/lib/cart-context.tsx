import { 
  createContextId, 
  useContext, 
  useContextProvider, 
  useStore, 
  useVisibleTask$,
  type Signal
} from '@builder.io/qwik';
import type { CartItem } from '~/types';

// Інтерфейс для стану кошика
export interface CartState {
  items: CartItem[];
}

// Контекст для Resumability - ключовий елемент архітектури
export const CartContext = createContextId<CartState>('cart-context');

// Провайдер контексту кошика з localStorage підтримкою
export const useCartProvider = () => {
  const cart = useStore<CartState>({
    items: [],
  });

  // Завантажуємо з localStorage при ініціалізації (тільки в браузері)
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

  // Зберігаємо в localStorage при змінах (реактивно)
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

  // Реєструємо провайдер для Resumability
  useContextProvider(CartContext, cart);
  return cart;
};


export const useCart = () => {
  return useContext(CartContext);
};