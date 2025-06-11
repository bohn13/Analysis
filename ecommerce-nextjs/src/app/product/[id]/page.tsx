import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/lib/products';
import { AddToCartButton } from './add-to-cart-button';

interface ProductPageProps {
  params: { id: string };
}

// ✅ Типизируй аргумент через интерфейс
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-2xl font-bold text-gray-900 mb-6">${product.price}</div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
