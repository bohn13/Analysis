/**
 * Express server for Qwik City
 */

import express from 'express';
import compression from 'compression';
import { join } from 'path';
import { fileURLToPath } from 'url';
import {
  createQwikCity,
  type PlatformNode,
} from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import { manifest } from '@qwik-client-manifest';

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const buildDir = join(__dirname, 'public');

const app = express();

// GZIP
app.use(compression());

// Статика
app.use(express.static(buildDir, {
  cacheControl: true,
  maxAge: '1y',
  immutable: true,
}));

// Qwik City middleware
const { router, notFound } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});
app.use(router);
app.use(notFound);

// Старт
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
