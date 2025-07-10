@echo off
title API Test Script
echo ========================================
echo Iniciando pruebas de API
echo ========================================
echo.

REM GET /api/packages
echo Probando getAllPackages GET /api/packages
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/packages' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM GET /api/packages/1
echo Probando getPackageById GET /api/packages/1
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/packages/1' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM POST /api/reservations
echo Probando createReservation POST /api/reservations
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/reservations' -Method Post -Body '{\"name\": \"Juan Pérez\", \"email\": \"juan@example.com\", \"package_id\": 1, \"reservation_date\": \"2025-07-20\"}' -ContentType 'application/json' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM POST /api/admin/login
echo Probando login POST /admin/login
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/admin/login' -Method Post -Body '{\"email\": \"admin@example.com\", \"password\": \"admin123\"}' -ContentType 'application/json' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM POST /api/packages
echo Probando createPackage POST /api/packages
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/packages' -Method Post -Body '{\"title\": \"Tour a la montaña\", \"description\": \"Un hermoso recorrido por la montaña\", \"location\": "Cordillera", \"price\": 100.00, \"image_url:\": "http://example.com/imagen.jpg"}' -ContentType 'application/json' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM PUT /api/packages/1
echo Probando updatePackage PUT /api/packages/1
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/packages/1' -Method Put -Body '{\"title\": \"Tour actualizado\", \"price\": \180.00\}' -ContentType 'application/json' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM DELETE /api/packages/1
echo Probando deletePackage DELETE /api/packages/1
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/packages/1' -Method Delete | ConvertTo-Json -Depth 10"
echo.
echo -----------------------------------------

REM GET /api/reservations
echo Probando getAllReservations GET /api/reservations
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/reservations' | ConvertTo-Json -Depth 10"
echo.
echo ----------------------------------------

REM DELETE /api/reservations/1
echo Probando deleteReservationById DELETE /api/reservations/1
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/api/reservations/1' -Method Delete | ConvertTo-Json -Depth 10"
echo.
echo -----------------------------------------