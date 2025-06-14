import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { products } from '~/lib/products';
import ProductCard from '~/components/product/product-card';

export default component$(() => {
  return (
    <div class="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section - ідентичний до Next.js */}
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
          Welcome to TechStore
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the latest technology and gadgets with our modern e-commerce platform
        </p>
        <div class="mt-6 flex justify-center">
          <div class="rounded-full bg-blue-100 px-4 py-2">
            <span class="text-sm font-medium text-blue-800">
              Qwik 1.2 + Resumability
            </span>
          </div>
        </div>
      </div>

      {/* Stats Section - ідентичний до Next.js */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div class="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div class="text-2xl font-bold text-gray-900">{products.length}</div>
          <div class="text-sm text-gray-600">Products</div>
        </div>
        <div class="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div class="text-2xl font-bold text-gray-900">4</div>
          <div class="text-sm text-gray-600">Categories</div>
        </div>
        <div class="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div class="text-2xl font-bold text-gray-900">Free</div>
          <div class="text-sm text-gray-600">Shipping</div>
        </div>
        <div class="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div class="text-2xl font-bold text-gray-900">24/7</div>
          <div class="text-sm text-gray-600">Support</div>
        </div>
      </div>

      {/* Products Grid - ідентичний до Next.js */}
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'TechStore - Qwik E-commerce Demo',
  meta: [
    {
      name: 'description',
      content: 'Modern e-commerce platform built with Qwik 1.2 and Resumability',
    },
  ],
};