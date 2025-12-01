# GitHub Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: **gridwatch**
3. Description: "Modern energy monitoring dashboard"
4. Choose **Public** (required for GitHub Pages on free plan)
5. Do NOT initialize with README (we already have one)
6. Click **Create repository**

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
# Verify remote is set (should already be done)
git remote -v

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token (PAT) instead of password
- Or use GitHub CLI: `gh auth login`

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: **GitHub Actions** (not "Deploy from a branch")
5. Click **Save**

## Step 4: Trigger Deployment

Once you push to main, the GitHub Actions workflow will automatically:
1. Build your project
2. Deploy to GitHub Pages

You can monitor progress in the **Actions** tab.

## Step 5: Access Your Site

After successful deployment (2-3 minutes), your site will be available at:

**https://hsasksol.github.io/gridwatch/**

## Troubleshooting

### Authentication Issues

If `git push` fails with authentication error:

**Option A: Personal Access Token**
```bash
# Generate token at: https://github.com/settings/tokens
# Select scopes: repo (all)
# Use token as password when pushing
git push origin main
```

**Option B: GitHub CLI**
```bash
# Install GitHub CLI: https://cli.github.com/
gh auth login
git push origin main
```

### Build Fails

Check the Actions tab for errors. Common issues:
- Node version mismatch (we use Node 20)
- Missing dependencies (run `npm install` locally first)

### 404 Error on Deployment

Make sure:
1. GitHub Pages is set to "GitHub Actions" source
2. The workflow completed successfully
3. Repository is public

## Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the built files at http://localhost:4173

## Update Deployment

Any push to `main` branch will trigger automatic redeployment.

```bash
git add .
git commit -m "Your changes"
git push origin main
```

---

**Note:** The first deployment may take 5-10 minutes to propagate through GitHub's CDN.
