# GitHub Pages Deployment Guide

## The 404 Issue Fix

The 404 errors you're experiencing are common with Next.js static exports on GitHub Pages. Here's how to fix it:

### Option 1: Use Custom Domain (Recommended)

1. **Get a custom domain** (e.g., `yourname.com`)
2. **Add CNAME file**:
   ```bash
   echo "yourname.com" > public/CNAME
   ```
3. **Update DNS** to point to your GitHub Pages URL
4. **Deploy** - GitHub Pages will serve from the root

### Option 2: Repository Name = Username (Alternative)

If your repository name matches your GitHub username exactly, GitHub Pages serves from the root automatically.

### Option 3: Manual Fix (Current Setup)

The current configuration should work, but you need to:

1. **Go to Repository Settings** → **Pages**
2. **Source**: Select "GitHub Actions"
3. **Wait for deployment** to complete
4. **Your site will be at**: `https://yourusername.github.io/personal-website`

### Troubleshooting

If you're still getting 404s:

1. **Check the Actions tab** - make sure the deployment succeeded
2. **Check the Pages tab** - verify the source is set to "GitHub Actions"
3. **Clear browser cache** - hard refresh (Ctrl+F5 or Cmd+Shift+R)
4. **Check the URL** - make sure you're using the correct GitHub Pages URL

### Local Testing

To test locally:
```bash
# Build the site
npm run build

# Serve the static files
npx serve out
# or
python -m http.server 8000 -d out
```

### Common Issues

- **404 on refresh**: This is normal for SPAs - GitHub Pages handles this
- **Assets not loading**: Check that all paths are relative
- **Styling broken**: Ensure Tailwind CSS is building correctly

The current setup should work correctly once deployed through GitHub Actions!
