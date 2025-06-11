import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';

// TODO: Это Server Component - основная страница для измерения TTI
export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TechStore
        </h1>
        <p className="text-xl text-gray-600">
          Simple e-commerce demo for performance testing
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}