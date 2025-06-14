import { $ } from '@builder.io/qwik';
import type { Product } from '~/types';
import { useStore } from '@builder.io/qwik';
import type { CartItem } from '~/types';


export const addItemToCart = $((store: CartStoreReturn, product: Product) => {
  const existing = store.cart.items.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    store.cart.items.push({ product, quantity: 1 });
  }
});


export const removeItemFromCart = $((store: CartStoreReturn, productId: string) => {
  store.cart.items = store.cart.items.filter((item) => item.product.id !== productId);
});


export const updateItemQuantity = $((store: CartStoreReturn, productId: string, quantity: number) => {
  const item = store.cart.items.find((item) => item.product.id === productId);
  if (!item) return;

  if (quantity <= 0) {
    store.cart.items = store.cart.items.filter((item) => item.product.id !== productId);
  } else {
    item.quantity = quantity;
  }
});


export const clearCart = $((store: CartStoreReturn) => {
  store.cart.items = [];
});


export const getTotalPrice = (store: CartStoreReturn): number => {
  return store.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export type CartStoreReturn = {
  cart: { items: CartItem[] };
};

export function useCartStore(): CartStoreReturn {
  return {
    cart: useStore<{ items: CartItem[] }>({
      items: [],
    }),
  };
}