#!/bin/bash

# AITechPulze Backend - Quick Deploy Script

echo "🚀 AITechPulze Backend Deployment"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  WARNING: .env file not found!"
    echo "Please create .env file with your credentials before deploying."
    echo "Use .env.example as template."
    exit 1
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Deploy: AITechPulze Backend with Email & WhatsApp APIs"

# Add remote if not exists
if ! git remote | grep -q origin; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/Niranjanprakash/aitechpulze-backend.git
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://dashboard.render.com/"
echo "2. Create New Web Service"
echo "3. Connect your GitHub repository"
echo "4. Set environment variables (see DEPLOYMENT.md)"
echo "5. Deploy!"
echo ""
echo "📖 Full guide: See DEPLOYMENT.md"
