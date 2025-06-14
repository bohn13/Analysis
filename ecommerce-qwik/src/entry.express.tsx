/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Express.js server when building for production.
 * This ensures full Resumability with SSR.
 */
import {
  createQwikCity,
  type PlatformNode,
} from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';

declare global {
  interface QwikCityPlatform extends PlatformNode {}
}

const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
  // Enable true Resumability with SSR
  base: '/build/',
});

export { router, notFound, staticFile };