import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { Product } from '~/types';
import AddToCart from './add-to-cart';

interface ProductCardProps {
  product: Product;
  eager?: boolean;
}

export default component$<ProductCardProps>(({ product, eager }) => {
  return (
    <div class="group relative h-full">
      <Link href={`/product/${product.id}`} class="block h-full">
        <div class="relative flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
          <div class="aspect-square bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority="high"
            />
          </div>

          <div class="flex flex-col flex-1 p-4 pb-14">
            <h3 class="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
            <div class="mt-auto flex items-center justify-between">
              <span class="text-lg font-bold text-blue-600">
                ${product.price}
              </span>
              <span class="text-xs uppercase tracking-wide text-gray-500 font-medium">
                {product.category}
              </span>
            </div>
          </div>

          <div class="absolute bottom-3 right-3">
            <AddToCart product={product} />
          </div>
        </div>
      </Link>
    </div>
  );
});