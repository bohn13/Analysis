import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import header from '~/components/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <div class="flex flex-col min-h-screen">
        <header />
        <main class="flex-1">
          <Slot />
        </main>
        <footer class="bg-gray-900 text-white py-8 mt-16">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-sm text-gray-400">
              © 2025 TechStore. Performance comparison demo.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
});