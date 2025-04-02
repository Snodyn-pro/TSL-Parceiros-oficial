# Set execution policy
Set-ExecutionPolicy Bypass -Scope Process -Force

# Download Node.js installer
$url = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
$output = "$env:TEMP\node-installer.msi"

Write-Host "Downloading Node.js installer..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $output

# Install Node.js
Write-Host "Installing Node.js..."
Start-Process msiexec.exe -Wait -ArgumentList '/i', $output, '/quiet', '/norestart'

# Clean up
Remove-Item $output

# Wait for Node.js to be available
Write-Host "Waiting for Node.js to be available..."
Start-Sleep -Seconds 10

# Create Next.js project
Write-Host "Creating Next.js project..."
npx create-next-app@latest nextjs-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

Write-Host "Setup completed! Please close and reopen your terminal."
Write-Host "Then run: cd nextjs-app && npm run dev" 