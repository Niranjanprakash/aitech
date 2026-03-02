@echo off
echo ========================================
echo Building Frontend for Hostinger
echo ========================================
echo.

cd frontend

echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Building production files...
call npm run build

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Files ready in: frontend\build\
echo.
echo Next Steps:
echo 1. Go to Hostinger File Manager
echo 2. Navigate to public_html
echo 3. Upload ALL files from frontend\build\
echo 4. Make sure .htaccess is uploaded
echo.
echo See HOSTINGER_DEPLOYMENT.md for details
echo ========================================
pause
