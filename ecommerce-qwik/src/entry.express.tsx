/**
 * Express server entry point for Qwik City with Resumability
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

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

// Polyfills for production
if (typeof globalThis.fetch === 'undefined') {
  const { fetch, Headers, Request, Response, FormData } = await import('undici');
  Object.assign(globalThis, { fetch, Headers, Request, Response, FormData });
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Create Express app
const app = express();

// Add compression middleware
app.use(compression());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

// Serve static files from public directory
const publicDir = join(__dirname, '..', 'public');
app.use('/build/', express.static(join(__dirname, 'build'), {
  immutable: true,
  maxAge: '1y'
}));

app.use(express.static(publicDir, {
  maxAge: '1h'
}));

// Create Qwik City middleware
const { router, notFound } = createQwikCity({
  render,
  qwikCityPlan,
  // Add getOrigin for proper URL handling
  getOrigin(req) {
    const protocol = req.headers['x-forwarded-proto'] || 
                    req.headers['x-forwarded-ssl'] === 'on' ? 'https' : 'http';
    const host = req.headers['x-forwarded-host'] || 
                req.headers.host || 
                'localhost:8000';
    return `${protocol}://${host}`;
  }
});

// Use Qwik City router
app.use(router);
app.use(notFound);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Express Error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Qwik SSR + Resumability server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});