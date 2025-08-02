# 🚀 Deployment Guide

This guide provides step-by-step instructions for deploying Wanderly Nepal to various platforms.

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved (except UI library issues)
- [ ] ESLint warnings addressed
- [ ] Responsive design tested on multiple devices
- [ ] Accessibility requirements met (WCAG AA)
- [ ] Performance optimized (images, code splitting)

### ✅ Environment Setup
- [ ] Environment variables configured
- [ ] Database connections tested
- [ ] API endpoints verified
- [ ] Third-party integrations working

### ✅ Testing
- [ ] Manual testing completed
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness confirmed
- [ ] Loading states and error handling tested

## 🌐 Deployment Platforms

### 1. 🟢 Vercel (Recommended)

Vercel provides the best experience for React applications with zero-config deployment.

#### Quick Deploy
1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "feat: ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Connect your GitHub repository
   - Vercel automatically detects Vite configuration

3. **Environment Variables**
   In Vercel dashboard, add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_NAME=Wanderly Nepal
   ```

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

#### Build Configuration
Vercel automatically uses these settings:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. 🔵 Netlify

Great alternative with similar features to Vercel.

#### Deploy Steps
1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

2. **Environment Variables**
   In Site Settings → Environment Variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_NAME=Wanderly Nepal
   ```

3. **Deploy**
   - Drag and drop `dist` folder, or
   - Connect GitHub repository for automatic deployments

### 3. 🟣 Railway

Full-stack hosting with database support.

#### Setup
1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Initialize Project**
   ```bash
   railway init
   railway add
   ```

3. **Configure Build**
   Create `railway.toml`:
   ```toml
   [build]
   builder = "nixpacks"
   buildCommand = "npm run build"

   [deploy]
   startCommand = "npm run preview"
   ```

### 4. 🟠 AWS S3 + CloudFront

For enterprise deployments with AWS infrastructure.

#### Build and Deploy
```bash
# Build the project
npm run build

# Install AWS CLI and configure
aws configure

# Create S3 bucket
aws s3 mb s3://wanderly-nepal-app

# Upload files
aws s3 sync dist/ s3://wanderly-nepal-app --delete

# Enable static website hosting
aws s3 website s3://wanderly-nepal-app --index-document index.html
```

## 🔧 Build Optimization

### Production Build
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Build Analysis
```bash
# Analyze bundle size
npm install -g vite-bundle-analyzer
npx vite-bundle-analyzer
```

### Performance Optimizations
1. **Image Optimization**
   - Use WebP format for images
   - Implement lazy loading
   - Optimize image sizes

2. **Code Splitting**
   ```tsx
   // Lazy load components
   const TravelJournal = lazy(() => import('./components/TravelJournal'));
   ```

3. **Tree Shaking**
   ```tsx
   // Import only what you need
   import { Button } from './ui/button';
   // Instead of: import * as UI from './ui';
   ```

## 🔒 Security Configuration

### Content Security Policy (CSP)
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.supabase.co;
">
```

### Environment Variables Security
Never expose sensitive data:
```bash
# ✅ Good - Client-side environment variables
VITE_APP_NAME=Wanderly Nepal
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ0... (anon key only)

# ❌ Bad - Server-side secrets
SUPABASE_SERVICE_KEY=service_key_here
DATABASE_PASSWORD=secret_password
```

## 📊 Monitoring and Analytics

### Error Tracking
Add error monitoring service:
```tsx
// Example: Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### Performance Monitoring
```tsx
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Analytics
```tsx
// Google Analytics 4
import { gtag } from 'ga-gtag';

gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href,
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Build project
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: vercel/action@v24
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🌍 Custom Domain Setup

### Domain Configuration
1. **Purchase Domain**
   - Recommended: Namecheap, Google Domains, Cloudflare

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel's IP)
   ```

3. **SSL Certificate**
   - Automatically provided by Vercel/Netlify
   - Enable HTTPS redirect

### Subdomain Setup
```
# Development
dev.wanderly-nepal.com → Vercel preview deployments

# Staging
staging.wanderly-nepal.com → Staging environment

# Production
wanderly-nepal.com → Production deployment
```

## 📱 PWA Configuration

### Manifest File
Create `public/manifest.json`:
```json
{
  "name": "Wanderly Nepal",
  "short_name": "Wanderly",
  "description": "Discover authentic travel experiences in Nepal",
  "theme_color": "#374151",
  "background_color": "#f9fafb",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
```tsx
// Register service worker for offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Environment Variable Issues**
```bash
# Check if variables are accessible
console.log(import.meta.env.VITE_SUPABASE_URL);
```

**Routing Issues on SPA**
Add to `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Performance Issues**
- Check bundle size with `npm run build`
- Optimize images and assets
- Enable gzip compression
- Use CDN for static assets

### Support Resources
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vite**: [vitejs.dev/guide](https://vitejs.dev/guide)

## 📈 Post-Deployment

### Checklist
- [ ] Verify all pages load correctly
- [ ] Test user authentication flow
- [ ] Confirm API integrations work
- [ ] Check responsive design on real devices
- [ ] Test offline functionality (if PWA)
- [ ] Monitor error rates and performance
- [ ] Set up backup and monitoring systems

### Maintenance
- Regular dependency updates
- Security patch monitoring  
- Performance optimization
- User feedback collection
- A/B testing for improvements

---

🎉 **Congratulations!** Your Wanderly Nepal application is now live and ready to help travelers discover the beauty of Nepal!
