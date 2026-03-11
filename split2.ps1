Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Stop-Process -Name vite -Force -ErrorAction SilentlyContinue

Move-Item -Path server, fix_db.js, .env -Destination backend -Force -ErrorAction SilentlyContinue

If (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
If (Test-Path package-lock.json) { Remove-Item package-lock.json -Force }

Write-Host "Installing Root Dependencies..."
npm install
Write-Host "Installing Frontend Dependencies..."
cd frontend
npm install
cd ..
Write-Host "Installing Backend Dependencies..."
cd backend
npm install
cd ..
Write-Host "Migration Complete."
