FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build Qwik app with Resumability
RUN npm run build

# Build Express server adapter
RUN npm run build.server

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

# Copy built Qwik app
COPY --from=builder /app/dist ./dist

# Copy Express server
COPY --from=builder /app/server ./server

# Copy adapters structure (needed for imports)
COPY --from=builder /app/adapters ./adapters

# Copy static assets if any
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 8000

# Set production environment
ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })"

# Start Express server with FULL Resumability
CMD ["node", "server/entry.express.js"]