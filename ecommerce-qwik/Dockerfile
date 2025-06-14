FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build Qwik app with Resumability
RUN npm run build.types && npm run build.server

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

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

CMD ["node", "server/entry.express.js"]