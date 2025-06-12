import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechStore - E-commerce Demo',
  description: 'Modern e-commerce demo for performance comparison',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-400">
                © 2025 TechStore. Performance comparison demo.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}