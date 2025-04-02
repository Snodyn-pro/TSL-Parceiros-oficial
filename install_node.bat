@echo off
echo Downloading Node.js installer...
powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile 'node-installer.msi'}"

echo Installing Node.js...
msiexec /i node-installer.msi /quiet /norestart

echo Cleaning up...
del node-installer.msi

echo Node.js installation completed. Please restart your computer.
pause 