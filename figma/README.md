# SkillBridge — Production Figma Design System & Deliverable

This directory contains the production-ready **Figma Design System & Screen Deliverables** for **SkillBridge**, precisely mapped to the live web application.

---

## 📁 Deliverable Directory Structure

```text
skillbridge/figma/
├── 01_Design_System.svg            # Master Design System (Tokens, Typography, Buttons, Badges, Cards)
├── 02_Dashboard_Home.svg           # Main Dashboard (Hero Readiness, 4 Stat Cards, Active Stage 02)
├── 03_Profile_Career_Progress.svg  # Candidate Profile, 48% Readiness Gauge, Badges, Skill Inventory
├── 04_AI_Career_Assistant.svg      # AI Chat Interface, Live Parameters Sidebar, Stage 02 Prompt
├── 05_Portfolio_Projects.svg       # Proof of Work Grid (Completed, In-Progress, Upcoming)
├── 06_Skills_Skill_Gap.svg         # Diagnostics, AI Market Alert, Filter Pills, Skills Matrix
├── 07_Platform_Settings.svg        # Settings Panels (Quantix Theme, Local Storage, Reminders, AI)
├── tokens.json                     # W3C / Tokens Studio for Figma (Design Tokens)
├── variables.json                  # Native Figma Variables Collection Export
└── README.md                       # Comprehensive Design System & Import Specification
```

---

## 🚀 How to Import into Figma in 30 Seconds

### Method 1: Instant Native Drag & Drop (Recommended)
1. Open [Figma](https://www.figma.com/) and create a new design file named **SkillBridge — AI Career Roadmap**.
2. Create 7 pages in Figma corresponding to the 7 sections:
   - `01. Design System`
   - `02. Dashboard / Home`
   - `03. Profile & Career Progress`
   - `04. AI Career Assistant`
   - `05. Portfolio Projects`
   - `06. Skills / Skill Gap`
   - `07. Platform Settings`
3. Drag and drop each `.svg` file from `skillbridge/figma/` into its respective Figma page.
4. **Figma automatically converts the SVGs into native vector layers, frames, editable text nodes, linear & radial gradients, and rounded rectangles.**

### Method 2: Import Variables & Tokens (Tokens Studio for Figma)
1. Open the **Tokens Studio for Figma** plugin.
2. Click **Settings → Load from File/URL** and select [`figma/tokens.json`](./tokens.json).
3. All colors, spacing, corner radii, and typography styles will instantly populate as global Figma tokens.

### Method 3: 1-Click Live Code Sync (`html.to.design` Plugin)
Because the SkillBridge web application is running live at `http://localhost:5173/`:
1. Run the `html.to.design` plugin in Figma.
2. Enter `http://localhost:5173/` (or specific routes `/dashboard`, `/profile`, `/ai`, `/projects`, `/skill-gap`, `/settings`).
3. Click **Import** — it will generate native Figma Auto Layout components directly from the browser DOM.

---

## 🎨 Visual Design System Specifications

### 1. Color Palette (Quantix Dark Theme)

| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **`Background/Canvas`** | `#07080B` | Deep near-black primary application background |
| **`Background/Subtle`** | `#0A0B0F` | Secondary background surface & dark callouts |
| **`Background/Sidebar`** | `#090A0D` | Navigation sidebar background with subtle top glow |
| **`Surface/Card`** | `#101217` | Standard elevated container surface |
| **`Surface/Elevated`** | `#13151B` | Elevated panels, active navigation, input surfaces |
| **`Surface/Hover`** | `#171A21` | Interactive hover state for cards & list items |
| **`Border/Primary`** | `#242832` | Standard card and control borders |
| **`Border/Subtle`** | `#1B1E25` | Inner dividers, table rules, and subtle boundaries |
| **`Accent/Primary`** | `#7C5CFF` | Quantix purple/indigo accent (primary CTA buttons, active state) |
| **`Accent/Bright`** | `#8B6CFF` | High-contrast interactive violet (button hover, active icons) |
| **`Accent/Soft`** | `#A38BFF` | Subtle tags, highlights, and secondary text accents |
| **`Feedback/Success`** | `#27D6A0` | Career readiness score, completed badges, checkmarks |
| **`Feedback/Warning`** | `#EAB04B` | Study streak flame, in-progress items, bottlenecks |
| **`Feedback/Error`** | `#E15C62` | Critical skill gaps, error alerts, alerts |
| **`Text/Primary`** | `#F2F3F5` | Headings, active values, high-contrast primary text |
| **`Text/Secondary`** | `#949BAD` | Descriptions, body copy, secondary labels |
| **`Text/Muted`** | `#687083` | Metadata, timestamps, captions, disabled states |

---

### 2. Typography Hierarchy (Plus Jakarta Sans / Inter)

| Style | Size / Line Height | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display Large** | `32px / 40px` | Extrabold (800) | `-0.02em` | Page Greetings, Hero Metrics |
| **Heading Large** | `24px / 32px` | Bold (700) | `-0.01em` | Section Titles, Modal Headers |
| **Heading Medium** | `18px / 26px` | Bold (700) | `0em` | Card Titles, Project Names |
| **Body Regular** | `14px / 22px` | Medium (500) | `0em` | Navigation Items, Primary Descriptions |
| **Body Small** | `12px / 18px` | Regular (400) | `0em` | Card Subtext, Form Help Text |
| **Micro / Tag** | `10px / 14px` | Bold (700) | `+0.08em` | Uppercase Category Badges, Status Pills |

---

### 3. Component & Variant Matrix

#### Buttons
- **`Primary`**: Background `#7C5CFF`, Hover `#8B6CFF`, Text `#F2F3F5`, Radius `8px`, Padding `10px 16px`.
- **`Secondary`**: Background `#171A21`, Border `1px #242832`, Text `#F2F3F5`, Radius `8px`.
- **`Outline`**: Background `transparent`, Border `1px #242832`, Text `#949BAD`, Hover Border `#7C5CFF`.
- **`Ghost`**: Background `transparent`, Text `#949BAD`, Hover Text `#F2F3F5`.

#### Badges & Status Pills
- **`Accent`**: Fill `rgba(124, 92, 255, 0.15)`, Border `1px rgba(124, 92, 255, 0.3)`, Text `#8B6CFF`.
- **`Success`**: Fill `rgba(39, 214, 160, 0.12)`, Border `1px rgba(39, 214, 160, 0.25)`, Text `#27D6A0`.
- **`Warning`**: Fill `rgba(234, 176, 75, 0.12)`, Border `1px rgba(234, 176, 75, 0.25)`, Text `#EAB04B`.
- **`Neutral`**: Fill `#171A21`, Border `1px #242832`, Text `#949BAD`.

#### Cards & Surfaces
- **`Surface Card`**: Fill `#101217`, Border `1px #242832`, Radius `16px`, Shadow `0 8px 30px rgba(0,0,0,0.25)`.
- **`Elevated Card`**: Fill `#13151B`, Border `1px #242832`, Radius `16px`.
- **`Ambient Glow Card`**: Fill `#101217`, Border `1px rgba(124, 92, 255, 0.35)`, Background Radial Glow `rgba(124, 92, 255, 0.08)`.

---

## 🖥️ Screen-by-Screen Inventory

### Screen 1: `01_Design_System.svg`
- Color tokens & swatches with hex and RGB values
- Typography specimen scale with sample UI strings
- Button variants (Default, Hover, Outline, Ghost)
- Badges & status pills with glow treatments
- Linear & radial progress bars (Gradient 48%, Emerald 100%)
- Container card patterns with stroke geometry

### Screen 2: `02_Dashboard_Home.svg`
- **Sidebar**: Compass logo, active navigation with purple glow vertical pill, 8-day streak pill, Aarav profile card.
- **Top Header**: Target Role pill (`Data Analyst` • `4-6 hrs/wk` • `48% Readiness`), Ask AI button, Notifications.
- **Hero Readiness Card**: Data Analyst target with +12% weekly progress badge, 48% readiness progress bar, Next Gate callout (`Stage 02 SQL Query Test`), and CTA.
- **4 Statistics Cards**: Skills (`2 / 7`), Projects (`1 / 4`), Study Streak (`8 Days`), Target Readiness (`48%`).
- **Active Stage Card**: Stage 02 SQL & Relational Databases with interactive subtask checklist.
- **AI Suggested Prompts**: 4 one-click quick prompt pills.

### Screen 3: `03_Profile_Career_Progress.svg`
- **Candidate Overview**: Aarav avatar with purple ring, education, age, target career, 48% readiness gauge.
- **3 Breakdown Metrics**: Skills Acquired (`2 completed`), Portfolio Projects (`1 completed`), Learning Modules (`4 completed`).
- **Achievements & Badges**: First Milestone (Earned), Consistency Champion (Earned), SQL Explorer (In Progress).
- **Verified Skill Inventory**: Tagged chips categorized by Strong, Developing, and Gap statuses.

### Screen 4: `04_AI_Career_Assistant.svg`
- **Left Column**: Live Career Parameters Anchor (Candidate profile, Target Role, Readiness, Focus, Bottleneck, Weekly Budget).
- **Right Column**: Interactive AI Chat panel:
  - Header with `Gemini AI Connected` active status badge & Clear Chat button.
  - Chat thread showing user query `"What should I learn next?"`.
  - Rich AI Career Advisor response with `Stage 02: SQL & Databases` context tag, 5-hour breakdown, formatted SQL code block (`SELECT ... FROM customers ...`), and action button shortcut (`View Stage in Roadmap →`).
  - Suggested prompt pills & bottom input bar.

### Screen 5: `05_Portfolio_Projects.svg`
- 2x2 grid of real portfolio deliverables:
  - Project 1: **E-Commerce Sales Performance Dashboard** (Completed, 100%, 4/4 tasks, GitHub repo active).
  - Project 2: **Multi-Table Customer Churn Database** (In Progress, 35%, 2/5 tasks, Active repo).
  - Project 3: **Exploratory Python Data Pipeline** (Upcoming, locked until Stage 02).
  - Project 4: **Executive BI Decision Matrix** (Upcoming, Capstone).

### Screen 6: `06_Skills_Skill_Gap.svg`
- **Market Diagnostic Banner**: AI alert identifying SQL multi-table JOINs as the 94% job market bottleneck.
- **Filter Tabs**: All (7), Strong (2), Developing (2), Skill Gaps (3).
- **Skills Matrix (6 cards)**: Progress meters, category tags, and hiring relevance for Excel, Python, SQL, Storytelling, Tableau, and Business Metrics.

### Screen 7: `07_Platform_Settings.svg`
- Quantix Dark Aesthetic token confirmation card (`#07080B` canvas, `#7C5CFF` accent).
- Demo State & Local Storage management with **Reset to Aarav Demo** button.
- Daily Habit Push Notifications toggle (`Enabled`).
- AI Intelligence Provider status panel confirming **Google Gemini Active (Primary)** with OpenAI fallback.
