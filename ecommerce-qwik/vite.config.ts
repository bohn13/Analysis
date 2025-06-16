import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        client: {
          outDir: 'dist/build',
        },
        ssr: {
          outDir: 'server',
        },
      }),
      tsconfigPaths(),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
      port: 5173,
      host: '0.0.0.0',
    },
    build: {
      target: 'es2022', 
      minify: 'esbuild' as const,
    },
    server: {
      headers: {
        'Cache-Control': 'public, max-age=0',
      },
    },
  };
});