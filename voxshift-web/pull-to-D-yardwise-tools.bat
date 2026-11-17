@echo off
REM Sync latest VoXShift / yardwise-tools changes onto D:\yardwise-tools
setlocal
set "ROOT=D:\yardwise-tools"
if not exist "%ROOT%\.git" (
  echo No git repo at %ROOT%.
  echo Clone first, then re-run this script.
  echo   cd /d D:\
  echo   git clone https://github.com/talhashah34/yardwise-tools.git yardwise-tools
  exit /b 1
)
cd /d "%ROOT%"
git fetch origin
git checkout cursor/voxshift-web-1bc5
git pull origin cursor/voxshift-web-1bc5
echo.
echo Done. Web app lives in: %ROOT%\voxshift-web
echo Run:
echo   cd /d %ROOT%\voxshift-web
echo   npm install
echo   npm run dev
endlocal
