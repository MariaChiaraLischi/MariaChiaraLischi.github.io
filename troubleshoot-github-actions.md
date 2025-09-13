# GitHub Actions Troubleshooting Guide

## Common Issues and Solutions

### 1. Check GitHub Pages Settings

**Go to your repository → Settings → Pages**

Make sure:
- **Source**: "GitHub Actions" (not "Deploy from a branch")
- **Custom domain**: Leave empty unless you have one
- **Enforce HTTPS**: Can be enabled

### 2. Check Repository Permissions

**Go to your repository → Settings → Actions → General**

Make sure:
- **Actions permissions**: "Allow all actions and reusable workflows"
- **Workflow permissions**: "Read and write permissions" and "Allow GitHub Actions to create and approve pull requests"

### 3. Check the Actions Tab

**Go to your repository → Actions tab**

Look for:
- ✅ Green checkmark = Success
- ❌ Red X = Failed
- 🟡 Yellow circle = In progress

### 4. Common Error Messages

#### "Permission denied" or "403 Forbidden"
- Check repository permissions (step 2)
- Make sure the repository is public (required for free GitHub Pages)

#### "No such file or directory: ./out"
- The build step failed
- Check the build logs for errors
- Make sure all dependencies are installed

#### "Workflow run failed"
- Check the specific step that failed
- Look at the logs for error messages
- Common issues: Node.js version, missing dependencies, build errors

### 5. Manual Trigger

If automatic deployment isn't working:

1. **Go to Actions tab**
2. **Click on "Deploy to GitHub Pages"**
3. **Click "Run workflow"**
4. **Select "main" branch**
5. **Click "Run workflow"**

### 6. Debug Steps

1. **Check the build step logs**:
   - Look for "Build completed. Contents of out directory:"
   - Verify `index.html` and `_next` directory exist

2. **Check the upload step logs**:
   - Look for "Uploading artifact"
   - Verify the path is correct (`./out`)

3. **Check the deploy step logs**:
   - Look for "Deploying to GitHub Pages"
   - Check for any permission errors

### 7. Local Testing

Before pushing to GitHub, test locally:

```bash
# Test the build
npm run build

# Test the static files
npx serve out --listen 3001
# Visit http://localhost:3001
```

### 8. Force Re-deploy

If the deployment seems stuck:

1. **Go to Actions tab**
2. **Find the latest workflow run**
3. **Click "Re-run all jobs"**

### 9. Check the Deployed Site

After successful deployment:
- Visit: `https://yourusername.github.io/personal-website`
- Check browser console for errors
- Try different pages (/, /about, /articles, /arcade)

### 10. Still Having Issues?

If nothing works:
1. **Check the repository name** - must match the URL
2. **Try a different branch** - some users have issues with `main`
3. **Check GitHub status** - sometimes GitHub has outages
4. **Wait a few minutes** - deployments can take time to propagate

## Quick Fix Commands

```bash
# Test locally
npm run build
npx serve out --listen 3001

# Check build output
ls -la out/
ls -la out/_next/

# Force push to trigger deployment
git add .
git commit -m "Trigger deployment"
git push origin main
```
