# Akshbuilds Backend API Server

Private backend API server for the Akshbuilds portfolio. Provides contact message intake, admin authentication, SQLite storage, and rate limiting.

## Quick Start on This Machine

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and set your ADMIN_SECRET_KEY and ALLOWED_ORIGINS
   ```

3. **Start the server**:
   - For development: `npm run dev`
   - For production: `npm start`
   - With PM2 (recommended for 24/7 background hosting): `npm run pm2`

## Endpoints

- `GET /api/status`: Health check
- `POST /api/contact`: Receives contact form submissions (Rate limited)
- `GET /api/messages`: Returns contact messages (Requires `Authorization: Bearer <ADMIN_SECRET_KEY>`)
- `GET /api/projects`: Returns upcoming projects from SQLite

For complete instructions on setting up HTTPS tunneling and connecting the frontend, see [../HOSTING_PRIVATE_SERVER.md](../HOSTING_PRIVATE_SERVER.md).
