@echo off
chcp 65001 >nul
title Fahad Video Studio - Claude
cd /d "%USERPROFILE%\Fahadbinalipro"
git pull
cd remotion
echo.
echo Claude is starting. First time: sign in with your Claude Pro account.
echo Type your video request (see START-HERE.md for a ready prompt).
echo.
call claude
pause
