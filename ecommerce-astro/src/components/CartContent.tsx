import { useCartStore } from '../lib/cart-store';
import { useEffect, useState } from 'react';

export default function CartContent() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <a 
          href="/" 
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <a
          href="/checkout"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors block text-center"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
}