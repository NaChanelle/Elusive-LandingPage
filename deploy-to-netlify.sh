#!/bin/bash

# Netlify Deployment Script for Elusive
echo "🚀 Preparing Elusive for Netlify deployment..."

# Clean and build
echo "📦 Building project..."
npm run build

# Ensure _redirects is in the right place
echo "🔄 Setting up redirects..."
cp _redirects dist/public/_redirects

# Verify build output
echo "✅ Build verification:"
ls -la dist/public/

echo "🎯 Files ready for Netlify deployment!"
echo ""
echo "📋 Deployment checklist:"
echo "1. Push these files to your GitHub repo:"
echo "   - netlify.toml (updated publish directory)"
echo "   - _redirects (SPA routing)"
echo "   - Built files in dist/public/"
echo ""
echo "2. In Netlify site settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist/public"
echo ""
echo "3. Enable in Netlify dashboard:"
echo "   - Identity (for CMS login)"
echo "   - Git Gateway (for CMS saves)"
echo ""
echo "Your site URL: https://lighthearted-pony-bfe03b.netlify.app"