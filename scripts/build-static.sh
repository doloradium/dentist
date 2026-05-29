#!/bin/bash
set -e

# Temporarily move dev-only routes out of the way
mv app/keystatic app/_keystatic 2>/dev/null || true
mv app/api app/_api 2>/dev/null || true
mv app/login app/_login 2>/dev/null || true
mv middleware.ts _middleware.ts 2>/dev/null || true

# Build static export
STATIC_EXPORT=true npx next build

# Generate sitemap
npx next-sitemap

# Restore dev-only routes
mv app/_keystatic app/keystatic 2>/dev/null || true
mv app/_api app/api 2>/dev/null || true
mv app/_login app/login 2>/dev/null || true
mv _middleware.ts middleware.ts 2>/dev/null || true

echo "✓ Static build complete → out/"
