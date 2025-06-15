import express from 'express';
import compression from 'compression';
import { createQwikCity, type PlatformNode } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import { manifest } from '@qwik-client-manifest';
import https from 'https';
import fs from 'fs';

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

const app = express();

// Production middleware
app.use(compression());

const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});

app.use(staticFile);
app.use(router);
app.use(notFound);

const PORT = parseInt(process.env.PORT || '3000', 10);

const options = {
  key: fs.readFileSync('/path/to/your/privkey.pem'),
  cert: fs.readFileSync('/path/to/your/fullchain.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`[Qwik] HTTPS server is running on https://localhost:${PORT}`);
});