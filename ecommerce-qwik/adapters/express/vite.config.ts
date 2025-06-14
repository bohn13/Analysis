import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.express.tsx', '@qwik-city-plan'],
      },
      outDir: 'server',
      target: 'es2022', // Додано для підтримки top-level await
    },
    publicDir: false,
    ssr: {
      target: 'node', // Виправлено на правильне значення
      noExternal: [
        '@builder.io/qwik',
        '@builder.io/qwik-city',
        'undici'
      ],
    },
  };
});