# 🚀 Deployment Guide - AkshBuilds Portfolio

## ✅ Pre-Deployment Checklist

All critical issues have been fixed! Here's what was done:

- ✅ Environment variables configured
- ✅ API URL now uses env variables
- ✅ CORS properly configured
- ✅ ESLint errors fixed
- ⚠️ Images need optimization (see IMAGE_OPTIMIZATION_GUIDE.md)

---

## 📦 Environment Variables Setup

### Frontend (.env)
```bash
# Development
VITE_API_URL=http://localhost:3000

# Production (update this!)
VITE_API_URL=https://your-backend-api.com
```

### Backend (server/.env)
```bash
# Development
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Production (update this!)
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED

#### Deploy Frontend to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# VITE_API_URL = https://your-backend.onrender.com
```

#### Deploy Backend to Render:
1. Go to https://render.com
2. Create new **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `ALLOWED_ORIGINS` = `https://yourdomain.vercel.app`

---

### Option 2: Netlify (Frontend) + Railway (Backend)

#### Deploy Frontend to Netlify:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variable in Netlify dashboard:
# VITE_API_URL = https://your-backend.railway.app
```

#### Deploy Backend to Railway:
1. Go to https://railway.app
2. Create new project from GitHub
3. Set root directory to `server`
4. Add environment variables (same as Render)

---

### Option 3: All-in-One (Vercel Serverless)

Convert your Express backend to Vercel serverless functions:

1. Move `server/index.js` to `api/index.js`
2. Update `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔧 Post-Deployment Steps

### 1. Update CORS Origins
In `server/.env` (production):
```bash
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 2. Test Contact Form
- Visit your deployed site
- Fill out contact form
- Check if it submits successfully

### 3. Check Database
- Ensure SQLite database persists (or migrate to PostgreSQL for production)
- For Render/Railway: Use persistent disk or external database

### 4. Monitor Performance
- Run Lighthouse audit
- Check image load times
- Test on mobile devices

---

## 🐛 Troubleshooting

### Contact Form Not Working?
1. Check browser console for CORS errors
2. Verify `VITE_API_URL` is set correctly
3. Ensure backend `ALLOWED_ORIGINS` includes your frontend domain

### Images Not Loading?
1. Check if images are in `public/assets/` folder
2. Verify paths start with `/assets/` not `./assets/`
3. Ensure images are committed to Git

### Backend Crashes?
1. Check if `dotenv` is installed: `cd server && npm install`
2. Verify all environment variables are set
3. Check logs in hosting platform dashboard

---

## 📊 Performance Optimization (After Deployment)

1. **Optimize Images** - See IMAGE_OPTIMIZATION_GUIDE.md
2. **Enable Gzip** - Most hosts do this automatically
3. **Add CDN** - Cloudflare (free tier)
4. **Lazy Load Images** - Add `loading="lazy"` to img tags
5. **Code Splitting** - Already handled by Vite

---

## 🎯 Next Steps

1. **Optimize images** (10 min) - Biggest impact!
2. **Deploy frontend** (15 min)
3. **Deploy backend** (15 min)
4. **Update environment variables** (5 min)
5. **Test everything** (10 min)

**Total time:** ~1 hour to go live! 🚀

---

## 💡 Pro Tips

- Use **Vercel** for frontend (free, fast, easy)
- Use **Render** for backend (free tier available)
- Keep `.env` files in `.gitignore` (already done!)
- Test locally before deploying: `npm run build && npm run preview`

Need help with deployment? Let me know! 🙌
