# Bilvo Ai — Enterprise AI Automations & Workflows

Production-grade enterprise web application and lead capture platform for Bilvo Ai, engineered with React 19, Vite 6, Tailwind CSS v4, Motion, and an Express.js backend with Firestore persistence and multi-tier email notification dispatch.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application with hot reloading.

### 3. Production Build & Test Locally
```bash
# Compile client assets to /dist and server to dist/server.cjs
npm run build

# Run the production server
npm start
```

---

## 📦 Deployment Options

### Option 1: Docker / Google Cloud Run / Container Platforms (Recommended)
This repository contains an optimized multi-stage `Dockerfile`.

```bash
# 1. Build the Docker container
docker build -t bilvo-ai:latest .

# 2. Run the container locally
docker run -p 3000:3000 --env-file .env bilvo-ai:latest
```

**Deploy to Google Cloud Run:**
```bash
gcloud run deploy bilvo-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

---

### Option 2: Render / Railway / Fly.io
1. Connect your exported GitHub repository.
2. Set the Build Command: `npm run build`
3. Set the Start Command: `npm start`
4. Configure environment variables in the platform dashboard (see `.env.example`).

---

### Option 3: Static Hosting (Vercel, Netlify, Cloudflare Pages)
If you wish to deploy the frontend as a static SPA:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Fallback**: Route all requests to `index.html`.
*Note: The consultation form includes automatic client-side relay fallback so you will still receive lead emails even without running the Node backend.*

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NOTIFICATION_EMAIL` | Destination email for strategy session leads | `knmili2000@gmail.com` |
| `RESEND_API_KEY` | Resend API key for instant transactional emails | `re_...` |
| `RESEND_FROM_EMAIL` | Verified sender address | `Bilvo Ai <onboarding@resend.dev>` |
| `SMTP_HOST` | Custom SMTP host (alternative to Resend) | `smtp.example.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `user@example.com` |
| `SMTP_PASS` | SMTP password / app password | `secret` |
| `GEMINI_API_KEY` | Google Gemini AI API key | Injected by AI Studio |

---

## 🛡️ Architecture & Lead Ingestion Pipeline

1. **Lead Intake**: Captures validated enterprise prospect parameters (budget, timeline, company size, AI goals, problem statement).
2. **Persistence**: Saves structured documents to Firebase Firestore (`strategy_session_requests`).
3. **Multi-tier Notification Relay**:
   - **Tier 1**: Resend API (sub-second high-deliverability email)
   - **Tier 2**: SMTP via Nodemailer (if custom credentials provided)
   - **Tier 3**: Direct Server Relay (zero-config transactional fallback)
4. **Anti-Abuse**: Rate-limiting window (15 mins) and honeypot spam protection.
5. **Offline Safety**: Local browser state backup ensures zero lead data loss.
