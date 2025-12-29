@echo off
echo Starting React E-Shop with Docker...
docker-compose up --build -d
if %errorlevel% neq 0 (
    echo Docker Compose failed to start.
    pause
    exit /b %errorlevel%
)
echo.
echo Application started successfully!
echo Backend: http://localhost:8081
echo Frontend: http://localhost:80
echo Database: localhost:5432
echo.
pause
