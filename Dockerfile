# Multi-stage Dockerfile for Nadesiko3 AI - Global Ready
# This is AI modified! Optimized for worldwide deployment and usage

# Build stage
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    git \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./
COPY core/package*.json ./core/

# Install dependencies
RUN npm ci --only=production && \
    cd core && npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build && \
    npm run build:command && \
    npm run build:esbuild

# Production stage with multi-architecture support
FROM --platform=linux/amd64,linux/arm64 node:22-bookworm-slim AS production

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd -r nadesiko && useradd -r -g nadesiko nadesiko

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/core/dist ./core/dist
COPY --from=builder /app/core/node_modules ./core/node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/tools ./tools
COPY --from=builder /app/demo ./demo
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/core/package*.json ./core/

# Make executables available
RUN chmod +x src/cnako3.mjs \
    tools/nako3server/index.mjs \
    tools/nako3edit/index.mjs \
    && npm link

# Set up environment for global deployment
ENV NAKO3SERVER_OPEN=0 \
    NAKO3SERVER_HOST=0.0.0.0 \
    NAKO3SERVER_PORT=3000 \
    NAKO3EDIT_OPEN=0 \
    NAKO3EDIT_HOST=0.0.0.0 \
    NAKO3EDIT_PORT=8888 \
    NAKO3_WEB_PORT=3000 \
    NAKO3_API_PORT=8080 \
    NODE_ENV=production \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# Create directories for user data
RUN mkdir -p /app/data /app/logs /app/temp && \
    chown -R nadesiko:nadesiko /app

# Expose ports for different services
EXPOSE 3000 8888 8080

# Switch to non-root user
USER nadesiko

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Default command shows help
CMD ["cnako3", "--help"]

# Labels for metadata
LABEL org.opencontainers.image.title="Nadesiko3 AI" \
      org.opencontainers.image.description="Japanese Programming Language with AI capabilities - Global Ready" \
      org.opencontainers.image.source="https://github.com/rabbit-hand/nadesiko3ai" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.version="3.7.19" \
      maintainer="Nadesiko3 AI Team"

# Usage examples:
# Basic usage:
#   docker build -t nadesiko3ai .
#   docker run --rm nadesiko3ai cnako3 -e "「Hello World!」と表示"
#
# Web server:
#   docker run -d -p 3000:3000 --name nadesiko3-server nadesiko3ai nako3server
#
# Web editor:
#   docker run -d -p 8888:8888 --name nadesiko3-editor nadesiko3ai nako3edit
#
# Development mode:
#   docker run -it -p 3000:3000 -p 8888:8888 -v $(pwd):/app nadesiko3ai bash
#
# Multi-service with docker-compose:
#   docker-compose up -d
