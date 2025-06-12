import { Product } from '@/types';

// TODO: Замени на свои товары если нужно другие категории
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://picsum.photos/seed/headphones/400/400',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://picsum.photos/seed/smartwatch/400/400',
    description: 'Advanced smartwatch with health tracking features.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Laptop Bag',
    price: 49.99,
    image: 'https://picsum.photos/seed/laptopbag/400/400',
    description: 'Durable laptop bag with multiple compartments.',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Coffee Mug',
    price: 15.99,
    image: 'https://picsum.photos/seed/coffeemug/400/400',
    description: 'Ceramic coffee mug with ergonomic design.',
    category: 'Home'
  },
  {
    id: '5',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://picsum.photos/seed/runningshoes/400/400',
    description: 'Comfortable running shoes for daily workouts.',
    category: 'Sports'
  },
  {
    id: '6',
    name: 'Desk Lamp',
    price: 29.99,
    image: 'https://picsum.photos/seed/desklamp/400/400',
    description: 'Modern LED desk lamp with adjustable brightness.',
    category: 'Home'
  }
];

export const getProduct = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};