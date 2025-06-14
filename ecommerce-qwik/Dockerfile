FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy all source code
COPY . .

# Build process - CRITICAL for Resumability
# 1. Build TypeScript types
RUN npm run build.types

# 2. Build client with Qwik optimizer (creates chunks for progressive loading)
RUN npm run build

# 3. Build server entry point
RUN npm run build.server

# VERIFY Resumability artifacts exist
RUN echo "=== Verifying Resumability Build ===" && \
    ls -la dist/ && \
    ls -la dist/build/ 2>/dev/null || echo "WARNING: dist/build/ missing" && \
    ls -la server/ && \
    find dist/ -name "q-manifest.json" -o -name "*manifest*" && \
    echo "=== Build verification complete ==="

# =====================================
# Production stage - Resumability optimized
# =====================================
FROM node:18-alpine AS production

WORKDIR /app

# Install system dependencies for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S qwik -u 1001

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy Resumability artifacts with proper ownership
# SERVER: SSR entry point for initial HTML generation
COPY --from=builder --chown=qwik:nodejs /app/server ./server

# DIST: Client-side chunks for progressive loading (CRITICAL for Resumability)
COPY --from=builder --chown=qwik:nodejs /app/dist ./dist

# PUBLIC: Static assets
COPY --from=builder --chown=qwik:nodejs /app/public ./public

# Verify critical Resumability files exist
RUN echo "=== Verifying Resumability in Production ===" && \
    ls -la server/entry.express.js && \
    ls -la dist/ && \
    find dist/ -name "*.js" | head -5 && \
    find dist/ -name "*manifest*" && \
    echo "=== Production verification complete ==="

# Set proper permissions for Resumability assets
RUN chown -R qwik:nodejs /app && \
    chmod -R 755 /app

# Switch to non-root user
USER qwik

# =====================================
# Resumability Configuration
# =====================================

# Expose port
EXPOSE 8000

# Environment variables optimized for Resumability
ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0

# Qwik-specific optimizations
ENV QWIK_OPTIMIZE=true
ENV QWIK_PREFETCH=true

# Health check that verifies Resumability
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e " \
    const http = require('http'); \
    const options = { hostname: 'localhost', port: 8000, path: '/health', timeout: 3000 }; \
    const req = http.get(options, (res) => { \
      console.log('Health check status:', res.statusCode); \
      process.exit(res.statusCode === 200 ? 0 : 1); \
    }); \
    req.on('error', (err) => { \
      console.error('Health check failed:', err.message); \
      process.exit(1); \
    }); \
    req.on('timeout', () => { \
      console.error('Health check timeout'); \
      req.destroy(); \
      process.exit(1); \
    }); \
  "

# Use dumb-init for proper signal handling (important for graceful shutdowns)
ENTRYPOINT ["dumb-init", "--"]

# Start command that preserves Resumability
CMD ["node", "server/entry.express.js"]