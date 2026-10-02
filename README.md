# SkillBridge — AI Career Roadmap Platform

> **Your skills. Your career. Your roadmap.**

SkillBridge is an AI-powered career planning platform for college students. It bridges the gap between academic coursework and hiring expectations by evaluating existing skills, pinpointing critical gaps, generating an adaptive milestone roadmap, and providing 24/7 grounded mentorship powered by Google Gemini.

---

## 🌟 Key Features

* **Personalized Career Roadmap:** Sequenced learning stages calibrated to target roles (Data Analyst, Software Engineer, Cloud Engineer), prior competencies, and realistic weekly study budgets (3–15 hours/week).
* **AI Career Assistant powered by Gemini:** Integrated with Google Gemini 2.5 Flash via the official `@google/genai` SDK. Contextually injected with candidate profile, current roadmap stage, skill bottlenecks, and study time.
* **Skill Gap Analysis:** Tri-state categorization of skills into *Strong*, *Developing*, and *Critical Gaps* relative to real industry hiring rubrics.
* **Project Guidance:** Curated, resume-ready portfolio projects featuring business context, step-by-step deliverables, and verifiable GitHub proof-of-work criteria.
* **Progress Tracking:** Real-time computed Career Readiness score, milestone checklists, study streaks, and unlockable achievement badges.
* **Real Google Sign-In:** Integrated with Google Identity Services (GIS) OAuth 2.0 with fresh profile onboarding.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti
* **AI Engine:** Google Gemini (`@google/genai` SDK, `gemini-3.5-flash-lite`)
* **Backend API:** Vite HTTP Middleware (`server/apiHandler.ts`, `server/aiService.ts`)
* **Authentication:** Google Identity Services (GIS) Web OAuth 2.0
* **Design System:** Custom Quantix Dark SaaS Theme (`#07080B` canvas, `#101217` surfaces, `#7C5CFF` purple primary, `#27D6A0` emerald accents, Inter typography)

---

## 📋 Prerequisites

* **Node.js:** v18.0.0 or higher (v20+ recommended)
* **npm:** v9.0.0 or higher

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/skillbridge.git
cd skillbridge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```

Open `.env` and insert your API keys:
```ini
# Google Gemini API Key (Server-side only)
# Get your free key at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite

# Google Identity Services Client ID
# Get from Google Cloud Console: https://console.cloud.google.com/apis/credentials
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

> **Security Note:** The `GEMINI_API_KEY` is loaded and executed strictly server-side by the backend API middleware (`server/aiService.ts`). It is never bundled into client-side JavaScript or exposed to browser network requests.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready bundle in the `dist/` directory.

---

## 🔑 Environment Variables Reference

| Variable | Required | Description | Example |
|---|---|---|---|
| `GEMINI_API_KEY` | Optional* | Google Gemini API key for real-time AI career chat and guidance | `AIzaSy...` |
| `GEMINI_MODEL` | Optional | Gemini model name (default: `gemini-3.5-flash-lite`) | `gemini-3.5-flash-lite` |
| `VITE_GOOGLE_CLIENT_ID` | Optional* | OAuth 2.0 Web Client ID for Google Sign-In button | `10429...apps.googleusercontent.com` |
| `PORT` | Optional | Server port (default: `5173`) | `5173` |

*\*If keys are omitted, the application runs gracefully with built-in rule-based fallback responses and quick-entry demo mode.*

---

## 📁 Project Directory Structure

```
skillbridge/
├── figma/                  # Design deliverables (SVGs, tokens, design system)
├── public/                 # Static public assets (icons, images)
├── scripts/                # Build and export utility scripts
├── server/                 # Server-side API middleware & Gemini AI service
│   ├── aiService.ts        # Official Google GenAI SDK integration & context injection
│   └── apiHandler.ts       # HTTP request router for /api/ai endpoints
├── src/
│   ├── components/         # Modular UI components (buttons, cards, layout, navbar)
│   ├── context/            # React CareerContext (state, auth, milestones, persistence)
│   ├── data/               # Career definitions, default milestones, mock data
│   ├── pages/              # Application pages (Landing, Login, Dashboard, AI, etc.)
│   ├── services/           # Client-side API and Google Auth services
│   ├── types/              # Comprehensive TypeScript interfaces and models
│   ├── App.tsx             # Root application component & client routing
│   ├── index.css           # Tailwind v4 configuration and Quantix theme tokens
│   └── main.tsx            # React application entry point
├── .env.example            # Environment variables configuration template
├── .gitignore              # Git ignore rules (excludes node_modules, .env, dist)
├── index.html              # HTML document root with Google GIS script
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with embedded server API middleware
```

---

## 🔌 API Endpoints

The project includes an embedded Node/Vite API server:

* `GET /api/ai/status` — Checks AI service health, configured provider, and active model.
* `POST /api/ai/chat` — Context-aware AI chat with student context injection (target career, roadmap stage, skill bottlenecks, study budget).

---

## 📄 License

MIT License. Developed as an AI Career Platform internship deliverable.
