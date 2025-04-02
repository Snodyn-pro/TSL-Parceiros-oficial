# Download Node.js installer
$url = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
$output = "$env:TEMP\node-installer.msi"

Write-Host "Downloading Node.js installer..."
Invoke-WebRequest -Uri $url -OutFile $output

# Install Node.js
Write-Host "Installing Node.js..."
Start-Process msiexec.exe -Wait -ArgumentList '/i', $output, '/quiet', '/norestart'

# Clean up
Remove-Item $output

Write-Host "Node.js installation completed. Please close and reopen your terminal." 