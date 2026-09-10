# Architecture, Security, & Code Quality Audit: akshbuilds

*Prepared by: Senior Systems Architect (40+ Years Experience)*
*Date: July 13, 2026*

I have conducted a comprehensive review of the frontend React code, backend Express logic, environment setups, and security controls for `akshbuilds.tech`. Below is my analysis of the codebase, detailing critical security flaws, environment bugs, and recommendations for performance and architectural robustness.

---

## 🚨 Critical Security Vulnerabilities

### 1. Unauthenticated Endpoint Exposing Client Inbox Data (FIXED ✅)
> [!CAUTION]
> **Severity:** Critical (Sensitive Data Exposure / Broken Object Level Authorization)
> 
> **File:** [server/index.js:L84-93](file:///Users/akshit/Desktop/CODE/akshbuilds/server/index.js#L84-93)
>
> **The Issue:**
> The Express endpoint `GET /api/messages` queries and returns the entire `messages` table containing prospective client names, email addresses, and detailed project request requirements in plain JSON format.
>
> Previously, there was **zero authentication or authorization** guarding this route. Anyone on the internet who locates your API server URL could retrieve your entire client contact history by making a simple GET request.
>
> **The Fix Applied:**
> Guarded this endpoint using token validation checks against your `ADMIN_SECRET_KEY` environment variable. Unauthorized requests are blocked with a `401 Unauthorized` response.

---

## 🐛 Critical Frontend Bugs

### 2. Hardcoded localhost API Call in Admin Dashboard (FIXED ✅)
> [!WARNING]
> **Severity:** High (Broken Production Feature)
> 
> **File:** [src/pages/Admin.jsx:L8](file:///Users/akshit/Desktop/CODE/akshbuilds/src/pages/Admin.jsx#L8)
>
> **The Issue:**
> In the frontend Admin component, the API call to load inbox messages was hardcoded:
> ```javascript
> fetch('http://localhost:3000/api/messages')
> ```
> In production, when visiting `akshbuilds.tech/admin`, the dashboard attempted to query `localhost` (the site visitor's local machine) rather than your hosted API server, resulting in a silent network failure.
>
> **The Fix Applied:**
> Updated the dashboard to load the API server address dynamically via `VITE_API_URL` environment variables, matching the contact form settings.

---

## 🛠️ General UX & SEO Enhancements

### 3. SEO Domain Alignment: Vercel Subdomain to Primary Domain (FIXED ✅)
> [!NOTE]
> **Severity:** Medium (SEO Indexing & Canonical Penalty Risk)
> 
> **Files:** `index.html`, `public/sitemap.xml`, `public/robots.txt`
>
> **The Issue:**
> The codebase's indexing headers (Canonical link, Open Graph url/image configurations, Structured LD-JSON metadata, Sitemap files, and Robots configuration) were hardcoded to point to the staging URL `akshbuilds.vercel.app` instead of your primary custom domain `akshbuilds.tech`.
>
> **The Fix Applied:**
> Migrated all indexing links to `https://akshbuilds.tech` to direct 100% of search crawler authority to your primary domain.

### 4. "View Resume" Button Links to General GitHub Profile
> [!NOTE]
> **Severity:** Minor (UX Inconsistency)
> 
> **File:** [src/components/Hero.jsx:L46-54](file:///Users/akshit/Desktop/CODE/akshbuilds/src/components/Hero.jsx#L46-54)
>
> **The Issue:**
> In the Hero section, the **View Resume** button links directly to `https://github.com/Akshh-bhardwaj`. While GitHub profiles are great, a prospective client or employer clicking "View Resume" expects a downloadable PDF file or a structured CV page.
>
> **The Recommendation:**
> Either host your PDF resume inside your `public/` directory (e.g., `public/assets/resume.pdf`) and update the link to point to `/assets/resume.pdf` (opening in a new tab), or change the button text to **GitHub Profile** to set correct user expectations.
