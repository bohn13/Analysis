# Web Framework Performance Analysis

Bachelor's diploma project (Mar–Jun 2025) — an experimental comparison of
modern web architectures to determine which delivers the best performance
and ROI for e-commerce platforms.

## Goal

Benchmark three current rendering approaches on identical prototypes and
form evidence-based criteria for technology stack selection.

## Frameworks compared

- **Astro 3** — Islands Architecture
- **Next.js 14** — React Server Components (RSC)
- **Qwik 1.2** — Resumability

## Method

Built three functionally identical e-commerce prototypes — one per framework —
and measured each with Lighthouse (Core Web Vitals, load performance),
combined with a TCO/ROI cost analysis.

## Key findings

| Framework   | LCP   | TBT   | JS bundle | Notes                          |
|-------------|-------|-------|-----------|--------------------------------|
| Astro 3     | 1.0s  | —     | 1.2 KB    | Fastest load, highest ROI      |
| Next.js 14  | 1.4s  | 60ms  | 27.4 KB   | Balanced, lowest entry cost    |
| Qwik 1.2    | 2.3s  | 0ms   | ~0 KB     | Perfect interactivity, slower first render |

- Modern architectures outperformed traditional SPAs by **30–40%** on key metrics
- Rendering model strongly affects SEO: client-side rendering indexed at ~66%
  vs **97–99%** for server-side approaches
- **No universal winner** — optimal choice depends on project type, budget,
  team skill, and business goals

## Recommendations

- **Startups / small business:** Astro 3 — highest ROI, lowest risk
- **Mid–large companies:** Next.js 14 — mature ecosystem, easy to scale a team
- **Content-heavy e-commerce:** Astro 3 — best SEO and load speed
- **Mobile-first / slow networks:** Qwik 1.2 — instant interactivity

## Notes

Full research thesis (~80 pages) available on request.
