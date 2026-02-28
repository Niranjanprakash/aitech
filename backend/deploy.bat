@echo off
REM AITechPulze Backend - Quick Deploy Script for Windows

echo.
echo ================================
echo AITechPulze Backend Deployment
echo ================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    git branch -M main
)

REM Check if .env exists
if not exist .env (
    echo.
    echo WARNING: .env file not found!
    echo Please create .env file with your credentials before deploying.
    echo Use .env.example as template.
    echo.
    pause
    exit /b 1
)

REM Add all files
echo Adding files to Git...
git add .

REM Commit
echo Creating commit...
git commit -m "Deploy: AITechPulze Backend with Email & WhatsApp APIs"

REM Add remote if not exists
git remote | findstr "origin" >nul
if errorlevel 1 (
    echo Adding GitHub remote...
    git remote add origin https://github.com/Niranjanprakash/aitechpulze-backend.git
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo.
echo ================================
echo Successfully pushed to GitHub!
echo ================================
echo.
echo Next Steps:
echo 1. Go to https://dashboard.render.com/
echo 2. Create New Web Service
echo 3. Connect your GitHub repository
echo 4. Set environment variables (see DEPLOYMENT.md)
echo 5. Deploy!
echo.
echo Full guide: See DEPLOYMENT.md
echo.
pause
