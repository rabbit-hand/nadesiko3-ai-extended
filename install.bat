@echo off
REM Nadesiko3 AI Enhanced Installation Script for Windows
REM Usage: curl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.bat > install.bat && install.bat

echo 🚀 Nadesiko3 AI Enhanced Installation
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version:
npm --version

REM Create installation directory
set INSTALL_DIR=%USERPROFILE%\.nadesiko3-ai
echo 📁 Installing to: %INSTALL_DIR%

if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"
cd /d "%INSTALL_DIR%"

REM Download and install
echo 📦 Downloading Nadesiko3 AI Enhanced...
curl -L -o nadesiko3-ai.zip "https://github.com/rabbit-hand/nadesiko3ai/archive/main.zip"

REM Extract
echo 📂 Extracting...
powershell -command "Expand-Archive -Path 'nadesiko3-ai.zip' -DestinationPath '.'"
cd nadesiko3ai-main

REM Install dependencies
echo 📚 Installing dependencies...
npm install

REM Build
echo 🔨 Building...
npm run build

REM Create command scripts
echo 🔗 Creating command scripts...
set BIN_DIR=%USERPROFILE%\.local\bin
if not exist "%BIN_DIR%" mkdir "%BIN_DIR%"

REM Create nako3-ai.bat
echo @echo off > "%BIN_DIR%\nako3-ai.bat"
echo node "%INSTALL_DIR%\nadesiko3ai-main\src\cnako3.mjs" %%* >> "%BIN_DIR%\nako3-ai.bat"

REM Create cnako3.bat
echo @echo off > "%BIN_DIR%\cnako3.bat"
echo node "%INSTALL_DIR%\nadesiko3ai-main\src\cnako3.mjs" %%* >> "%BIN_DIR%\cnako3.bat"

REM Create nako3server.bat
echo @echo off > "%BIN_DIR%\nako3server.bat"
echo node "%INSTALL_DIR%\nadesiko3ai-main\tools\nako3server\index.mjs" %%* >> "%BIN_DIR%\nako3server.bat"

REM Create nako3edit.bat
echo @echo off > "%BIN_DIR%\nako3edit.bat"
echo node "%INSTALL_DIR%\nadesiko3ai-main\tools\nako3edit\index.mjs" %%* >> "%BIN_DIR%\nako3edit.bat"

echo ✅ Created command scripts

REM Add to PATH
echo 📝 Adding to PATH...
powershell -command "[Environment]::GetEnvironmentVariable('PATH','User') -split ';' | Where-Object { $_ -ne '%BIN_DIR%' } | ForEach-Object { $_ }" > temp_path.txt
set /p CURRENT_PATH=<temp_path.txt
del temp_path.txt

setx PATH "%BIN_DIR%;%CURRENT_PATH%" >nul

REM Test installation
echo 🧪 Testing installation...
"%BIN_DIR%\nako3-ai.bat" -e "「こんにちは、なでしこ3 AI Enhanced！😊」と表示"

REM Cleanup
echo 🧹 Cleaning up...
cd /d "%INSTALL_DIR%"
rmdir /s /q nadesiko3ai-main
del nadesiko3-ai.zip

echo.
echo 🎉 Installation completed!
echo ================================
echo 📚 Usage:
echo   nako3-ai script.nako3     # Run Nadesiko3 script
echo   nako3server               # Start web server
echo   nako3edit                 # Start editor
echo.
echo 📖 Documentation: https://github.com/rabbit-hand/nadesiko3ai
echo 🔗 Data Science Demo: nako3-ai demo\datascience_demo_manual.nako3
echo.
echo ⚠️  If commands are not found, restart your command prompt.

pause
