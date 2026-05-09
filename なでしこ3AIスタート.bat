@echo off
chcp 65001 >nul
title なでしこ3AI - 子供でも簡単！日本語プログラミング

echo.
echo 🌟 なでしこ3AI - 子供でも簡単！日本語プログラミング 🌟
echo ====================================================
echo.
echo 💡 ヒント: 日本語でプログラミングしてみよう！
echo 💡 例: 「こんにちは」を表示
echo 💡 終了するには「終了」と入力
echo.
echo 1. Web版で始める (推奨)
echo 2. コマンド版で始める
echo 3. 終了
echo.
set /p choice="選択してください (1-3): "

if "%choice%"=="1" goto web
if "%choice%"=="2" goto command
if "%choice%"=="3" goto end

echo 無効な選択です。もう一度試してください。
goto start

:web
echo.
echo 🌐 Web版を起動します...
echo ブラウザが開いたら、すぐに始められます！
echo.
start "" "%~dp0nadesiko3ai_web.html"
goto start

:command
echo.
echo 💻 コマンド版を起動します...
echo.
node "%~dp0nadesiko3ai_starter.js"
goto start

:end
echo.
echo 👋 なでしこ3AIを終了します。また遊んでね！
timeout /t 3 >nul
exit
