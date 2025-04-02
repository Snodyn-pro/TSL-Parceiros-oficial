# Download Python installer
$url = "https://www.python.org/ftp/python/3.12.2/python-3.12.2-amd64.exe"
$output = "$env:TEMP\python-3.12.2-amd64.exe"

Write-Host "Downloading Python installer..."
Invoke-WebRequest -Uri $url -OutFile $output

# Install Python with default settings
Write-Host "Installing Python..."
Start-Process -FilePath $output -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1" -Wait

# Clean up
Remove-Item $output

Write-Host "Python installation completed!"
Write-Host "Please close and reopen your terminal to use Python." 