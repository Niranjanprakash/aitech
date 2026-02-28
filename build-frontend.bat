@echo off
echo ========================================
echo   AITechPulze - Frontend Build Script
echo ========================================
echo.

cd frontend

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Building production bundle...
set GENERATE_SOURCEMAP=false
call npm run build

echo.
echo [3/3] Build complete!
echo.
echo ========================================
echo   BUILD FOLDER: frontend\build\
echo ========================================
echo.
echo Next steps:
echo 1. Upload all files from 'frontend\build\' to Hostinger public_html/
echo 2. Create .htaccess file (see DEPLOYMENT_GUIDE.md)
echo 3. Test your website!
echo.
pause
