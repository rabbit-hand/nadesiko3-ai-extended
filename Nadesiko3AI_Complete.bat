@echo off
chcp 65001 >nul
title Nadesiko3AI Complete - Multi-Language Programming Environment

echo.
echo 🌟 Nadesiko3AI Complete - Multi-Language Programming Environment 🌟
echo ==============================================================
echo.
echo 💡 Choose your mode and language:
echo 💡 Example: "Hello World!" display or 「こんにちは」を表示
echo 💡 Type "exit" to quit
echo.
echo 📱 Web Versions (Recommended):
echo 1. Kids Japanese Web Version
echo 2. Kids English Web Version  
echo 3. Adult Japanese Web Version
echo 4. Adult English Web Version
echo.
echo 💻 Command Versions:
echo 5. Kids Japanese Command Version
echo 6. Kids English Command Version
echo 7. Adult Japanese Command Version
echo 8. Adult English Command Version
echo.
echo 9. Exit
echo.
set /p choice="Choose (1-9): "

if "%choice%"=="1" goto web_kids_ja
if "%choice%"=="2" goto web_kids_en
if "%choice%"=="3" goto web_adult_ja
if "%choice%"=="4" goto web_adult_en
if "%choice%"=="5" goto command_kids_ja
if "%choice%"=="6" goto command_kids_en
if "%choice%"=="7" goto command_adult_ja
if "%choice%"=="8" goto command_adult_en
if "%choice%"=="9" goto end

echo Invalid choice. Please try again.
goto start

:web_kids_ja
echo.
echo 🌐 Starting Kids Japanese Web Version...
echo Browser will open, ready to use!
echo.
start "" "%~dp0nadesiko3ai_web.html"
goto start

:web_kids_en
echo.
echo 🌐 Starting Kids English Web Version...
echo Browser will open, ready to use!
echo.
start "" "%~dp0nadesiko3ai_web_en.html"
goto start

:web_adult_ja
echo.
echo 🌐 Starting Adult Japanese Web Version...
echo Browser will open, ready to use!
echo.
start "" "%~dp0nadesiko3ai_adult_web.html"
goto start

:web_adult_en
echo.
echo 🌐 Starting Adult English Web Version...
echo Browser will open, ready to use!
echo.
start "" "%~dp0nadesiko3ai_adult_web_en.html"
goto start

:command_kids_ja
echo.
echo 💻 Starting Kids Japanese Command Version...
echo.
node "%~dp0nadesiko3ai_starter.js"
goto start

:command_kids_en
echo.
echo 💻 Starting Kids English Command Version...
echo.
node "%~dp0nadesiko3ai_starter_en.js"
goto start

:command_adult_ja
echo.
echo 💻 Starting Adult Japanese Command Version...
echo.
node "%~dp0nadesiko3ai_adult_starter.js"
goto start

:command_adult_en
echo.
echo 💻 Starting Adult English Command Version...
echo.
node "%~dp0nadesiko3ai_adult_starter_en.js"
goto start

:end
echo.
echo 👋 Goodbye! See you again!
echo 🌟 Thank you for using Nadesiko3AI Complete!
timeout /t 3 >nul
exit
