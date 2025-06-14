/**
 * QWIK RESUMABILITY SSR ENTRY POINT
 * 
 * This is the entry point for SSR that preserves full Resumability.
 * The application state is serialized on the server and resumed on the client
 * WITHOUT re-running any code - this is TRUE Resumability!
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Critical Resumability settings
    containerAttributes: {
      lang: 'en-us',
      ...opts.containerAttributes,
    },
    // Ensure proper serialization for Resumability
    base: '/build/',
    // Enable Resumability debugging (optional, can remove in production)
    debug: process.env.NODE_ENV === 'development',
  });
}