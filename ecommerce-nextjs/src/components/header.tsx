import Link from 'next/link';
import { CartButton } from './card-button';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          {/* TODO: Замени название на свое */}
          TechStore
        </Link>

        {/* Cart */}
        <CartButton />
      </div>
    </header>
  );
}