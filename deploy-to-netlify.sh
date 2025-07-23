#!/bin/bash

# Deploy script to manually upload critical files to Netlify
echo "Building project with image copying..."
npm run build
cp -r client/public/assets/uploads dist/public/assets/uploads || true

echo "Critical files for GitHub update:"
echo "1. netlify.toml (contains image copying fix)"
echo "2. client/public/assets/content/landing.json (updated content)"
echo "3. client/src/pages/landing.tsx (carousel display code)"
echo "4. client/public/assets/uploads/ (your images)"

echo ""
echo "Netlify build command should be:"
echo "npm run build && cp -r client/public/assets/uploads dist/public/assets/uploads || true"

echo ""
echo "After pushing netlify.toml to GitHub, images will appear at:"
echo "https://lighthearted-pony-bfe03b.netlify.app/assets/uploads/dsc02299.jpg"
echo "https://lighthearted-pony-bfe03b.netlify.app/assets/uploads/dsc02323.jpg"
echo "https://lighthearted-pony-bfe03b.netlify.app/assets/uploads/dsc02478.jpg"
echo "https://lighthearted-pony-bfe03b.netlify.app/assets/uploads/dsc02513.jpg"