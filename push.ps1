# Set local user credentials for git
git config --local user.name "manearyan5222"
git config --local user.email "manearyan5222@gmail.com"

# Stage all updated files and commit
git add .
git commit -m "feat: upgrade portfolio hub with 3D tilt, multi-themes, QR modal, & tabs"

# Ensure main branch is selected
git branch -M main

# Set/verify remote origin
git remote remove origin 2>$null
git remote add origin https://github.com/manearyan5222/portfolio-links.git

# Push to GitHub
Write-Host "Starting Git Push... If a login popup appears, please sign in." -ForegroundColor Cyan
git push -u origin main

Write-Host "Pushed successfully! Press any key to exit..." -ForegroundColor Green
[void][System.Console]::ReadKey()
