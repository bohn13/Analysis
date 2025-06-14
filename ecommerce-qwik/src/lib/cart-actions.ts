import { $ } from '@builder.io/qwik';
import type { Product } from '~/types';
import type { CartState } from './cart-context';

// QRL функції для Resumability - всі дії серіалізуються
export const addItemToCart = $((cart: CartState, product: Product) => {
  const existing = cart.items.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ product, quantity: 1 });
  }
});

export const removeItemFromCart = $((cart: CartState, productId: string) => {
  cart.items = cart.items.filter((item) => item.product.id !== productId);
});

export const updateItemQuantity = $((cart: CartState, productId: string, quantity: number) => {
  const item = cart.items.find((item) => item.product.id === productId);
  if (!item) return;

  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item.product.id !== productId);
  } else {
    item.quantity = quantity;
  }
});

export const clearCart = $((cart: CartState) => {
  cart.items = [];
});

// Синхронні функції для обчислень (не потребують QRL)
export const getTotalPrice = (cart: CartState): number => {
  return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getTotalItems = (cart: CartState): number => {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
};