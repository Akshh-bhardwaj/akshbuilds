# ⚡ Quick Start Guide

## 🎯 Get Running in 2 Minutes

### Step 1: Install Dependencies (30 seconds)
```bash
npm install
cd server && npm install && cd ..
```

### Step 2: Start Servers (10 seconds)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:5173
```

✅ **Done!** Your site is running locally.

---

## 🚀 Deploy to Production (30 minutes)

### Before Deploying:

1. **Optimize Images** (10 min) - See IMAGE_OPTIMIZATION_GUIDE.md
2. **Update Environment Variables** (5 min)

### Deploy:

**Frontend (Vercel):**
```bash
npm i -g vercel
vercel
```

**Backend (Render.com):**
1. Go to https://render.com
2. Create Web Service from GitHub
3. Set root directory: `server`
4. Add environment variables from `server/.env.example`

**Update Frontend .env:**
```bash
VITE_API_URL=https://your-backend.onrender.com
```

Redeploy frontend with new env variable.

---

## 📋 Environment Variables Checklist

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3000  # Local
# VITE_API_URL=https://your-api.com  # Production
```

### Backend (server/.env)
```bash
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Production:
# NODE_ENV=production
# ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 🧪 Test Everything Works

### 1. Test Contact Form
- Fill out form at http://localhost:5173/#contact
- Submit
- Check console for success message

### 2. Test Production Build
```bash
npm run build
npm run preview
```

### 3. Run Linter
```bash
npm run lint
# Should show: ✅ No errors
```

---

## 🐛 Common Issues

### Contact form not working?
- Check backend is running on port 3000
- Check browser console for errors
- Verify CORS origins match

### Images not loading?
- Images should be in `public/assets/`
- Paths should start with `/assets/` not `./assets/`

### Build errors?
- Run `npm run lint` to check for code issues
- Clear node_modules: `rm -rf node_modules && npm install`

---

## 📚 Full Documentation

- **Deployment:** See DEPLOYMENT_GUIDE.md
- **Image Optimization:** See IMAGE_OPTIMIZATION_GUIDE.md
- **Recent Fixes:** See FIXES_APPLIED.md
- **Full README:** See README_UPDATED.md

---

## 🎯 Priority Tasks

1. ✅ Environment setup (Done!)
2. ✅ ESLint fixes (Done!)
3. ⏳ **Optimize images** (10 min) ← DO THIS NEXT
4. ⏳ Deploy to production (30 min)

---

**Need help?** Check the guides above or reach out!

🚀 **You're ready to go live!**
