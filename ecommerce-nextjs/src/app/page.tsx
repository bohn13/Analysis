import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
          Welcome to TechStore
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the latest technology and gadgets with our modern e-commerce platform
        </p>
        <div className="mt-6 flex justify-center">
          <div className="rounded-full bg-blue-100 px-4 py-2">
            <span className="text-sm font-medium text-blue-800">
              Next.js 14 + React Server Components
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-sm text-gray-600">Products</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">4</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">Free</div>
          <div className="text-sm text-gray-600">Shipping</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">24/7</div>
          <div className="text-sm text-gray-600">Support</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}