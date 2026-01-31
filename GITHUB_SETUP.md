# Push CalmErrors to GitHub

## Step 1: Initialize Git Repository

```bash
# Initialize git in your project
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - CalmErrors v0.1.0"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `calm-errors`
3. Description: "Translates compiler and runtime errors into clear, calm, human-friendly explanations"
4. **Public** (recommended) or Private
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 3: Connect to GitHub and Push

After creating the repository on GitHub, run these commands:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/calm-errors.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Use SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/calm-errors.git
git branch -M main
git push -u origin main
```

## Complete Commands (Copy & Paste)

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Step 1: Initialize and commit
git init
git add .
git commit -m "Initial commit - CalmErrors v0.1.0

- VS Code extension for friendly error explanations
- Support for TypeScript, JavaScript, and Java
- 45+ error templates
- Hover provider with calm, human-friendly explanations
- Configurable reassurance and verbosity
- Privacy-first, offline operation"

# Step 2: After creating repo on GitHub, connect and push
git remote add origin https://github.com/YOUR_USERNAME/calm-errors.git
git branch -M main
git push -u origin main
```

## Verify

After pushing, visit:
```
https://github.com/YOUR_USERNAME/calm-errors
```

You should see all your files!

## Future Commits

After the initial push, use these commands for updates:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Tips

- **Username**: If prompted for username, enter your GitHub username
- **Password**: Use a Personal Access Token (not your password)
  - Generate at: https://github.com/settings/tokens
  - Select scopes: `repo` (full control of private repositories)
- **SSH**: Recommended for frequent pushes (no password needed)
  - Setup: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
