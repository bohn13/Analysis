import express from 'express';
import {
  createQwikCity,
  type PlatformNode,
} from '@builder.io/qwik-city/middleware/node';
import { fileURLToPath } from 'url';
import { join } from 'path';

import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import { manifest } from '@qwik-client-manifest';

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

const app = express();

// Serve static files from /public
const distDir = join(fileURLToPath(import.meta.url), '..', '..');
app.use('/public', express.static(join(distDir, 'public')));

const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});

// Use Qwik middlewares
app.use(staticFile);
app.use(router);
app.use(notFound);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Qwik SSR + Resumability server listening on http://localhost:${port}/`);
});
