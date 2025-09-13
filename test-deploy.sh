#!/bin/bash

echo "🚀 Testing deployment locally..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if out directory exists and has content
    if [ -d "out" ]; then
        echo "📁 Out directory exists"
        echo "📄 Contents of out directory:"
        ls -la out/
        
        # Check for essential files
        if [ -f "out/index.html" ]; then
            echo "✅ index.html found"
        else
            echo "❌ index.html not found!"
        fi
        
        if [ -d "out/_next" ]; then
            echo "✅ _next directory found"
        else
            echo "❌ _next directory not found!"
        fi
        
        # Start local server for testing
        echo "🌐 Starting local server for testing..."
        echo "Visit: http://localhost:3001"
        npx serve out --listen 3001
        
    else
        echo "❌ Out directory not found!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
