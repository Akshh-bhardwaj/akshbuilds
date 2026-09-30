# 🚀 AkshBuilds - Full-Stack Developer Platform & Portfolio

> Modern full-stack portfolio & developer utilities hub built with React 19, Vite, Framer Motion, and Express.

[![Live Demo](https://img.shields.io/badge/demo-akshbuilds.tech-00f0ff?style=for-the-badge&logo=firefox-browser)](https://akshbuilds.tech)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## ✨ Overview

**AkshBuilds** is a high-performance web platform designed to showcase full-stack engineering projects, interactive tools, and curated technical study handbooks. Featuring custom 3D particle animations, dynamic course planning, and a dedicated backend for communication and state management.

---

## 🌟 Key Features

- 🎨 **Modern Glassmorphic UI**: Sleek dark/light theme designed with Tailwind CSS and smooth Framer Motion micro-interactions.
- 🌐 **Interactive 3D Backgrounds**: Real-time WebGL graphics powered by Three.js and Vanta.js with responsive canvas scaling.
- 📚 **Knowledge Catalog & PDF Viewer**: Interactive directory of 40+ curated engineering study guides and interview roadmaps.
- 🤖 **Interactive Career Course Planner**: AI-assisted roadmap builder for full-stack and algorithmic learning tracks.
- 📬 **Contact & Communication Pipeline**: Express REST API with SQLite persistence and automated notifications.
- 📱 **Fully Responsive**: Mobile-first architecture with custom touch interactions and layout stability.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Component architecture & state hooks
- **Vite** - High-speed module bundler and build tool
- **Tailwind CSS** - Modern utility-first styling
- **Framer Motion** - Page transitions & gesture animations
- **Three.js & Vanta.js** - 3D dynamic visual effects

### Backend & Infrastructure
- **Node.js & Express** - Modular REST API
- **SQLite3** - Lightweight persistent message store
- **Vercel & Cloudflare** - Edge deployment and secure reverse proxy

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akshh-bhardwaj/akshbuilds.git
   cd akshbuilds
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   ```

5. **Start Development Servers**

   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
akshbuilds/
├── public/              # Static assets, fonts, icons
├── server/
│   ├── db.js           # SQLite schema and query setup
│   ├── index.js        # Express server endpoints
│   └── package.json
├── src/
│   ├── components/     # UI components (Navbar, Hero, Projects, Notes)
│   ├── hooks/          # Custom hooks (theme, viewport, listeners)
│   ├── pages/          # Primary view routes
│   ├── App.jsx         # Root router & layout
│   ├── main.jsx        # App entry point
│   └── index.css       # Design tokens & animations
├── package.json
└── vite.config.js
```

---

## 👤 Author

**Akshit Sharma**
- Portfolio: [akshbuilds.tech](https://akshbuilds.tech)
- GitHub: [@Akshh-bhardwaj](https://github.com/Akshh-bhardwaj)
- LinkedIn: [Akshit Sharma](https://www.linkedin.com/in/akshit-sharma-790601189/)
- Email: [akshubhardwaj231@gmail.com](mailto:akshubhardwaj231@gmail.com)

---

## 📝 License

This project is licensed under the MIT License.
