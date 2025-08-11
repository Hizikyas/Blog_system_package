#!/bin/bash

# Blog System Package Publishing Script
echo "🚀 Publishing @zemenay/blog-system package..."

# Step 1: Build the package
echo "📦 Building package..."
npm run build

# Step 2: Check if user is logged in to npm
echo "🔐 Checking npm authentication..."
npm whoami || {
    echo "❌ You need to login to npm first:"
    echo "   npm login"
    exit 1
}

# Step 3: Publish to npm
echo "📤 Publishing to npm..."
npm publish

echo "✅ Package published successfully!"
echo "📋 Users can now install with: npm install @zemenay/blog-system"
