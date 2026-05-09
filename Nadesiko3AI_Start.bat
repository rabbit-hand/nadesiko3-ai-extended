@echo off
chcp 65001 >nul
title Nadesiko3AI - Easy Japanese Programming for Kids!

echo.
echo 🌟 Nadesiko3AI - Easy Japanese Programming for Kids! 🌟
echo ====================================================
echo.
echo 💡 Try programming in simple English or Japanese!
echo 💡 Example: "Hello World!" display or 「こんにちは」を表示
echo 💡 Type "exit" to quit
echo.
echo 1. Start Web Version (Recommended)
echo 2. Start Japanese Command Version
echo 3. Start English Command Version
echo 4. Exit
echo.
set /p choice="Choose (1-4): "

if "%choice%"=="1" goto web
if "%choice%"=="2" goto command_ja
if "%choice%"=="3" goto command_en
if "%choice%"=="4" goto end

echo Invalid choice. Please try again.
goto start

:web
echo.
echo 🌐 Starting Web Version...
echo Browser will open, ready to use!
echo.
start "" "%~dp0nadesiko3ai_web.html"
goto start

:command_ja
echo.
echo 💻 Starting Japanese Command Version...
echo.
node "%~dp0nadesiko3ai_starter.js"
goto start

:command_en
echo.
echo 💻 Starting English Command Version...
echo.
node "%~dp0nadesiko3ai_starter_en.js"
goto start

:end
echo.
echo 👋 Goodbye! See you again!
timeout /t 3 >nul
exit
