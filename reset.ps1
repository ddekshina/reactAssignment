Write-Host "Cleaning npm cache..."
npm cache clean --force

Write-Host "Removing .vite cache if it exists..."
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite"
}

Write-Host "Reinstalling dependencies..."
npm install

Write-Host "Starting development server..."
npm run dev
