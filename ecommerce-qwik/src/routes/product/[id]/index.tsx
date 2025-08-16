import { component$ } from '@builder.io/qwik';
import { routeLoader$, Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { getProduct } from '~/lib/products';
import AddToCart from '~/components/product/add-to-cart';

export const useProductLoader = routeLoader$(async (requestEvent) => {
  const productId = requestEvent.params.id;
  const product = getProduct(productId);
  
  if (!product) {
    throw requestEvent.error(404, 'Product not found');
  }
  
  return product;
});

export default component$(() => {
  const product = useProductLoader();

  return (
    <div class="max-w-6xl mx-auto px-4 py-8">
      <Link 
        href="/" 
        class="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        ← Back to products
      </Link>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.value.image}
            alt={product.value.name}
            class="w-full h-full object-cover"
            width={600}
            height={600}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {product.value.name}
          </h1>
          
          <p class="text-gray-600 mb-6">
            {product.value.description}
          </p>
          
          <div class="text-2xl font-bold text-gray-900 mb-6">
            ${product.value.price}
          </div>

          <AddToCart product={product.value} variant="large" />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const product = resolveValue(useProductLoader);
  return {
    title: `${product.name} - TechStore`,
    meta: [
      {
        name: 'description',
        content: product.description,
      },
    ],
  };
};