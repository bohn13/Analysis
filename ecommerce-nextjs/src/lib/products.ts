import { Product } from '@/types';

// TODO: Замени на свои товары если нужно другие категории
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Advanced smartwatch with health tracking features.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Laptop Bag',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Durable laptop bag with multiple compartments.',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Coffee Mug',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
    description: 'Ceramic coffee mug with ergonomic design.',
    category: 'Home'
  },
  {
    id: '5',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Comfortable running shoes for daily workouts.',
    category: 'Sports'
  },
  {
    id: '6',
    name: 'Desk Lamp',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    description: 'Modern LED desk lamp with adjustable brightness.',
    category: 'Home'
  }
];

export const getProduct = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};