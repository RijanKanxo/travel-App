# 🚀 GitHub Pages Deployment Guide

## 📋 **Step-by-Step Setup Instructions**

### **1. Enable GitHub Pages in Your Repository**

1. **Go to Repository Settings**:
   - Visit: https://github.com/RijanKanxo/travel-App
   - Click the **"Settings"** tab

2. **Navigate to Pages Section**:
   - Scroll down in the left sidebar
   - Click **"Pages"**

3. **Configure Source**:
   - Under **"Source"**, select **"GitHub Actions"**
   - Click **"Save"**

### **2. Repository Visibility (Important!)**

**GitHub Pages requires**:
- ✅ **Public repository** (free)
- 🔒 **OR GitHub Pro/Team** (for private repos)

If your repo is private, either:
- Make it public: Settings → General → Danger Zone → Change visibility
- Or upgrade to GitHub Pro

### **3. Manual Deployment (Alternative)**

If GitHub Actions doesn't work immediately, you can deploy manually:

```bash
# Build the project
npm run build

# Deploy using gh-pages
npm run deploy
```

### **4. Verify Deployment**

After setup:
1. **Check Actions tab** for deployment status
2. **Visit your site**: https://RijanKanxo.github.io/travel-App/
3. **Allow 5-10 minutes** for first deployment

## 🔧 **Troubleshooting**

### **Common Issues & Solutions**

#### **"Pages not enabled" Error**
- ✅ **Solution**: Enable Pages in repository settings first
- ✅ **Check**: Repository must be public or have GitHub Pro

#### **"404 Not Found" Error**
- ✅ **Solution**: Wait 5-10 minutes after first deployment
- ✅ **Check**: Verify the correct URL format

#### **Build Failures**
- ✅ **Solution**: Check Actions tab for error details
- ✅ **Fix**: Usually TypeScript or dependency issues

### **Manual Deployment Steps**

If automated deployment fails:

```bash
# 1. Install gh-pages if not already installed
npm install --save-dev gh-pages

# 2. Build the project
npm run build

# 3. Deploy to GitHub Pages
npx gh-pages -d dist
```

## 🌐 **Your App URLs**

- **GitHub Pages**: https://RijanKanxo.github.io/travel-App/
- **Repository**: https://github.com/RijanKanxo/travel-App
- **Actions**: https://github.com/RijanKanxo/travel-App/actions

## ⚙️ **Configuration Files**

### **Updated Files for GitHub Pages**:
- ✅ `vite.config.ts` - Base path configuration
- ✅ `package.json` - Homepage URL and deploy scripts
- ✅ `.github/workflows/deploy.yml` - Automated deployment
- ✅ `package-lock.json` - gh-pages dependency

## 🎯 **Next Steps**

1. **Enable Pages** in repository settings
2. **Push changes** to trigger deployment
3. **Monitor Actions** tab for deployment progress
4. **Visit your live site** in 5-10 minutes

## 💡 **Pro Tips**

- **Custom Domain**: Add CNAME file for custom domain
- **HTTPS**: Automatically enabled by GitHub Pages
- **CDN**: Global distribution included
- **SSL Certificate**: Free and automatic

---

**Once you enable Pages in your repository settings, your Wanderly Nepal app will be live for the world to explore!** 🏔️🇳🇵
