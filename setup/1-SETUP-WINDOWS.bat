@echo off
chcp 65001 >nul
title Fahad Video Studio - Setup
echo.
echo ===== Fahad Video Studio : one-time setup =====
echo.
where node >nul 2>nul || (
  echo [1/5] Installing Node.js ...
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
)
where git >nul 2>nul || (
  echo [2/5] Installing Git ...
  winget install -e --id Git.Git --accept-source-agreements --accept-package-agreements
)
where node >nul 2>nul || (
  echo.
  echo Node.js / Git was just installed. Please CLOSE this window and double-click this file again.
  pause
  exit /b
)
echo [3/5] Installing Claude Code ...
call npm install -g @anthropic-ai/claude-code
if not exist "%USERPROFILE%\Fahadbinalipro" (
  echo [4/5] Downloading the video project (a GitHub login window may open - sign in) ...
  git clone https://github.com/shuvonfs/Fahadbinalipro.git "%USERPROFILE%\Fahadbinalipro"
)
cd /d "%USERPROFILE%\Fahadbinalipro"
git checkout claude/upbeat-einstein-2xyjvo
git pull
echo [5/5] Installing video tools (takes a few minutes) ...
cd remotion
call npm install
echo.
echo ===== DONE! Now double-click "2-START-CLAUDE-WINDOWS.bat" =====
pause
