@echo off
setlocal
cd /d "%~dp0"

if not exist "C:\Program Files\nodejs\node.exe" (
  echo ERROR: Node.js is not installed.
  exit /b 1
)

"C:\Program Files\nodejs\node.exe" server.js
exit /b %ERRORLEVEL%
