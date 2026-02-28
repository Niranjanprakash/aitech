@echo off
echo ========================================
echo AITechPulze - Git Push to GitHub
echo ========================================
echo.

echo Step 1: Adding all files...
git add .

echo.
echo Step 2: Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update: Backend ready for Render deployment

git commit -m "%commit_msg%"

echo.
echo Step 3: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Done! Check your GitHub repository.
echo Next: Deploy on Render using DEPLOYMENT_COMPLETE.md guide
echo ========================================
pause
