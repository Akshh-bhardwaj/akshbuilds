# 🖥️ Hosting Akshbuilds Backend on a Private Laptop

This guide explains step-by-step how to host the backend server (`server/`) on another laptop (Windows, Mac, or Linux) and connect your portfolio frontend to it.

---

## 🏗️ Architecture Overview

```
[ Visitor / Client Browser ]
             │
             │ HTTPS (e.g. https://akshbuilds.tech or Vercel)
             ▼
    [ Akshbuilds Frontend ]
             │
             │ Fetch request: POST /api/contact
             ▼
 [ Cloudflare Tunnel / HTTPS Proxy ] (Free, Secure, No Port Forwarding)
             │
             │ Encrypted Tunnel
             ▼
    [ Your Other Laptop ] ──► Node.js Server (Port 3000) ──► SQLite (database.sqlite)
```

---

## ⚡ Step 1: Copy the Server to the Other Laptop

Choose one of the following methods to get the `server/` code onto the other laptop:

### Option A: Via Git (Recommended)
If your repository is on GitHub:
```bash
git clone https://github.com/Akshh--bhardwaj/akshbuilds.git
cd akshbuilds/server
```

### Option B: Via USB Drive or Local Transfer
Copy the entire `server/` folder from this machine to the other laptop.

---

## ⚙️ Step 2: Install Dependencies & Setup Environment

1. Ensure **Node.js (v18+)** is installed on the other laptop (`node -v`).
2. Open a terminal inside the `server/` folder:
   ```bash
   cd server
   npm install
   ```

3. Create the `.env` file:
   - **Mac / Linux**:
     ```bash
     cp .env.example .env
     ```
   - **Windows (Command Prompt / PowerShell)**:
     ```powershell
     copy .env.example .env
     ```

4. Edit `.env` with your settings:
   ```env
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=production
   ADMIN_SECRET_KEY=your_super_secret_admin_password_here

   # Put your portfolio domains here (comma-separated):
   ALLOWED_ORIGINS=http://localhost:5173,https://akshbuilds.tech,https://akshbuilds.vercel.app
   ```

5. Test that the server starts locally:
   ```bash
   npm start
   ```
   You should see:
   ```
   ✅ SQLite Database initialized and checked.
   🚀 API Server running on http://0.0.0.0:3000
   🔒 Allowed Origins: http://localhost:5173, https://akshbuilds.tech, https://akshbuilds.vercel.app
   ```
   Press `Ctrl + C` to stop it for now.

---

## 🌐 Step 3: Expose the Server to the Internet (HTTPS)

> [!IMPORTANT]
> Because your frontend runs on **HTTPS** (e.g., `https://akshbuilds.tech` or `https://*.vercel.app`), web browsers will **block** requests to an insecure `http://` address (Mixed Content policy). Your backend **must** have an HTTPS URL.

### Recommended (Free, Secure, 24/7): Cloudflare Tunnel
Cloudflare Tunnel provides a secure, public HTTPS URL pointing directly to your laptop without exposing your home IP or configuring router port forwarding.

1. **Install Cloudflared on the other laptop**:
   - **Mac**: `brew install cloudflared`
   - **Linux**: `sudo apt install cloudflared` or download from [Cloudflare releases](https://github.com/cloudflare/cloudflared/releases)
   - **Windows**: Download `cloudflared.exe` from Cloudflare or via `winget install Cloudflare.cloudflared`

2. **Run Quick Tunnel (Instant HTTPS URL)**:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
   Cloudflare will output a public URL like:
   `https://random-words-1234.trycloudflare.com`

3. *(Optional - Best Practice)* **Custom Domain (e.g. `api.akshbuilds.tech`)**:
   If your domain is managed on Cloudflare, you can create a permanent named tunnel:
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create akshbuilds-api
   cloudflared tunnel route dns akshbuilds-api api.akshbuilds.tech
   cloudflared tunnel run --url http://localhost:3000 akshbuilds-api
   ```

---

### Alternative: Quick Test via LocalTunnel or Ngrok

If you just want to test quickly without installing Cloudflare:

- **LocalTunnel (no account needed)**:
  ```bash
  npx localtunnel --port 3000
  ```
  Provides a temporary URL like `https://xxxx.loca.lt`.

- **Ngrok**:
  ```bash
  ngrok http 3000
  ```
  Provides a temporary URL like `https://xxxx.ngrok-free.app`.

---

## 🔄 Step 4: Keep the Server Running 24/7 with PM2

To ensure the server automatically restarts if it crashes or when the laptop reboots:

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the server using the included ecosystem config:
   ```bash
   pm2 start ecosystem.config.cjs
   ```

3. Save the process list and configure auto-start on boot:
   ```bash
   pm2 save
   pm2 startup
   ```
   *(Run the command that `pm2 startup` displays on your terminal to register the system service).*

### Handy PM2 Commands:
- View status: `pm2 status`
- View live logs: `pm2 logs akshbuilds-api`
- Restart server: `pm2 restart akshbuilds-api`
- Stop server: `pm2 stop akshbuilds-api`

---

## 🔗 Step 5: Connect Your Frontend to the Private Server

Now connect your frontend to point to the laptop's public URL:

### 1. In Local Development
In the root directory of your project, edit `.env`:
```env
VITE_API_URL=https://your-tunnel-url.trycloudflare.com
```

### 2. In Production (Vercel)
1. Go to **[vercel.com/dashboard](https://vercel.com/dashboard)**.
2. Select your `akshbuilds` project.
3. Go to **Settings** → **Environment Variables**.
4. Set or update:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-tunnel-url.trycloudflare.com` (or `https://api.akshbuilds.tech`)
   - **Environments**: Check *Production*, *Preview*, and *Development*.
5. Redeploy your project on Vercel so the frontend picks up the new URL.

---

## 🧪 Step 6: Verify Everything is Working

1. **Check Server Health**:
   Open in your browser:
   `https://your-tunnel-url.trycloudflare.com/api/status`
   Should return:
   ```json
   {"status":"ok","environment":"production"}
   ```

2. **Test Contact Form**:
   Go to your portfolio, fill out the contact form, and submit. Check the laptop terminal (`pm2 logs akshbuilds-api`) to see the incoming message.

3. **Check Admin Dashboard**:
   Visit `https://your-portfolio.com/admin` or `http://localhost:5173/admin`, enter the `ADMIN_SECRET_KEY` you configured in `server/.env`, and you will see all submitted messages!
