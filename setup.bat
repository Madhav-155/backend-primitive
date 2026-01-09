@echo off
echo ============================================
echo   Backend Primitive - Quick Start Script
echo ============================================
echo.

echo [Step 1] Installing Backend Dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo.
echo ✅ Backend dependencies installed successfully!
echo.

echo [Step 2] Installing Frontend Dependencies...
echo.
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo.
echo ✅ Frontend dependencies installed successfully!
echo.

echo ============================================
echo   Installation Complete!
echo ============================================
echo.
echo NEXT STEPS:
echo.
echo 1. Setup MySQL database:
echo    - Open MySQL Workbench or command line
echo    - Run: CREATE DATABASE backend_primitive;
echo    - Import: database/schema.sql
echo.
echo 2. Configure .env file:
echo    - Update DB_PASSWORD with your MySQL password
echo.
echo 3. Start the servers:
echo    - Backend: npm run dev
echo    - Frontend: cd frontend ^&^& npm start
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo.
pause
