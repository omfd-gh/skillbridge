import fs from 'fs';
import path from 'path';
import { renderSidebar, renderTopHeader, SHARED_DEFS, OUT_DIR } from './generate_figma_screens.js';

// ==========================================
// 1. DESIGN SYSTEM SCREEN (1440 x 1500)
// ==========================================
function generateDesignSystemSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1500" viewBox="0 0 1440 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Background -->
  <rect width="1440" height="1500" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  <!-- Artboard Header -->
  <g id="DS_Header" transform="translate(64, 48)">
    <rect width="90" height="24" rx="12" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
    <text x="45" y="16" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">FIGMA 2.0</text>
    <text x="0" y="58" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="32" font-weight="800">SkillBridge Design System</text>
    <text x="0" y="84" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14">Quantix-Inspired Dark SaaS Architecture • Token Specifications &amp; Reusable Components</text>
  </g>

  <!-- SECTION 1: COLOR PALETTE -->
  <g id="Colors_Section" transform="translate(64, 180)">
    <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="700">01. Color Palette &amp; Variables</text>
    <text y="24" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Semantic dark surface tokens with subdued purple lighting</text>

    <!-- Row 1: Backgrounds & Surfaces -->
    <g transform="translate(0, 48)">
      <!-- Canvas -->
      <g transform="translate(0, 0)">
        <rect width="120" height="70" rx="8" fill="#07080B" stroke="#242832" stroke-width="1" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Canvas</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#07080B</text>
      </g>
      <!-- Surface Card -->
      <g transform="translate(136, 0)">
        <rect width="120" height="70" rx="8" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Surface Card</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#101217</text>
      </g>
      <!-- Elevated Surface -->
      <g transform="translate(272, 0)">
        <rect width="120" height="70" rx="8" fill="#13151B" stroke="#242832" stroke-width="1" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Elevated</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#13151B</text>
      </g>
      <!-- Hover -->
      <g transform="translate(408, 0)">
        <rect width="120" height="70" rx="8" fill="#171A21" stroke="#242832" stroke-width="1" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Hover State</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#171A21</text>
      </g>
      <!-- Border Primary -->
      <g transform="translate(544, 0)">
        <rect width="120" height="70" rx="8" fill="#242832" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Border Primary</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#242832</text>
      </g>
      <!-- Border Subtle -->
      <g transform="translate(680, 0)">
        <rect width="120" height="70" rx="8" fill="#1B1E25" stroke="#242832" stroke-width="1" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Border Subtle</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#1B1E25</text>
      </g>
    </g>

    <!-- Row 2: Accents & Feedback -->
    <g transform="translate(0, 180)">
      <!-- Accent Primary -->
      <g transform="translate(0, 0)">
        <rect width="120" height="70" rx="8" fill="#7C5CFF" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Accent Primary</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#7C5CFF</text>
      </g>
      <!-- Accent Bright -->
      <g transform="translate(136, 0)">
        <rect width="120" height="70" rx="8" fill="#8B6CFF" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Accent Bright</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#8B6CFF</text>
      </g>
      <!-- Accent Soft -->
      <g transform="translate(272, 0)">
        <rect width="120" height="70" rx="8" fill="#A38BFF" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Accent Soft</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#A38BFF</text>
      </g>
      <!-- Success -->
      <g transform="translate(408, 0)">
        <rect width="120" height="70" rx="8" fill="#27D6A0" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Success</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#27D6A0</text>
      </g>
      <!-- Warning -->
      <g transform="translate(544, 0)">
        <rect width="120" height="70" rx="8" fill="#EAB04B" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Warning</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#EAB04B</text>
      </g>
      <!-- Error -->
      <g transform="translate(680, 0)">
        <rect width="120" height="70" rx="8" fill="#E15C62" />
        <text x="12" y="90" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Error</text>
        <text x="12" y="104" fill="#687083" font-family="monospace" font-size="10">#E15C62</text>
      </g>
    </g>
  </g>

  <!-- SECTION 2: TYPOGRAPHY HIERARCHY -->
  <g id="Typography_Section" transform="translate(64, 520)">
    <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="700">02. Typography Styles</text>
    <text y="24" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Hierarchy based on Plus Jakarta Sans &amp; Inter</text>

    <g transform="translate(0, 48)">
      <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="32" font-weight="800">Display 32px / Extrabold (Good morning, Aarav 👋)</text>
      <text y="44" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="24" font-weight="700">Heading 24px / Bold (Your Skill Gap Diagnostics)</text>
      <text y="82" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="700">Title 18px / Bold (Stage 02: SQL &amp; Relational Databases)</text>
      <text y="116" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="500">Body 14px / Medium (A personalized path based on your current skills and 4-6 hrs weekly budget.)</text>
      <text y="146" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Caption 12px / Regular (You are outperforming 78% of peers aiming for junior data analytics roles.)</text>
      <text y="174" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="0.08em">MICRO 10px / UPPERCASE (STAGE 02 IN PROGRESS • 3 PROJECTS REMAINING)</text>
    </g>
  </g>

  <!-- SECTION 3: BUTTONS & INTERACTIVE CONTROLS -->
  <g id="Components_Section" transform="translate(64, 780)">
    <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="700">03. UI Components &amp; Variants</text>
    <text y="24" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Buttons, Badges, Chips, Form Inputs, and Progress Bars</text>

    <!-- Buttons -->
    <g transform="translate(0, 56)">
      <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">BUTTON VARIANTS</text>
      
      <!-- Primary -->
      <g transform="translate(0, 20)">
        <rect width="140" height="38" rx="8" fill="#7C5CFF" />
        <text x="70" y="24" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" text-anchor="middle">Continue Learning →</text>
      </g>
      <!-- Primary Hover -->
      <g transform="translate(156, 20)">
        <rect width="140" height="38" rx="8" fill="#8B6CFF" />
        <text x="70" y="24" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" text-anchor="middle">Primary Hover</text>
      </g>
      <!-- Secondary -->
      <g transform="translate(312, 20)">
        <rect width="130" height="38" rx="8" fill="#171A21" stroke="#242832" stroke-width="1" />
        <text x="65" y="24" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" text-anchor="middle">Secondary</text>
      </g>
      <!-- Outline -->
      <g transform="translate(458, 20)">
        <rect width="130" height="38" rx="8" fill="transparent" stroke="#242832" stroke-width="1" />
        <text x="65" y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="600" text-anchor="middle">Outline</text>
      </g>
    </g>

    <!-- Badges -->
    <g transform="translate(0, 150)">
      <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">BADGES &amp; PILLS</text>
      
      <!-- Accent Badge -->
      <g transform="translate(0, 20)">
        <rect width="90" height="24" rx="12" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
        <text x="45" y="16" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Target Career</text>
      </g>
      <!-- Success Badge -->
      <g transform="translate(106, 20)">
        <rect width="130" height="24" rx="12" fill="#27D6A0" fill-opacity="0.12" stroke="#27D6A0" stroke-opacity="0.25" stroke-width="1" />
        <circle cx="16" cy="12" r="3" fill="#27D6A0" />
        <text x="72" y="16" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Gemini Connected</text>
      </g>
      <!-- Warning Badge -->
      <g transform="translate(252, 20)">
        <rect width="96" height="24" rx="12" fill="#EAB04B" fill-opacity="0.12" stroke="#EAB04B" stroke-opacity="0.25" stroke-width="1" />
        <text x="48" y="16" fill="#EAB04B" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">8-Day Streak</text>
      </g>
      <!-- Neutral Badge -->
      <g transform="translate(364, 20)">
        <rect width="80" height="24" rx="12" fill="#171A21" stroke="#242832" stroke-width="1" />
        <text x="40" y="16" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Upcoming</text>
      </g>
    </g>

    <!-- Progress Bars -->
    <g transform="translate(0, 240)">
      <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">PROGRESS BARS</text>
      
      <!-- Gradient Readiness Bar (48%) -->
      <g transform="translate(0, 20)">
        <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Overall Career Readiness (48%)</text>
        <rect y="12" width="400" height="8" rx="4" fill="#0A0B0F" stroke="#1B1E25" stroke-width="1" />
        <rect y="12" width="192" height="8" rx="4" fill="url(#readinessGrad)" />
      </g>
      <!-- Success Project Bar (100%) -->
      <g transform="translate(440, 20)">
        <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Deliverable Completed (100%)</text>
        <rect y="12" width="300" height="8" rx="4" fill="#0A0B0F" stroke="#1B1E25" stroke-width="1" />
        <rect y="12" width="300" height="8" rx="4" fill="#27D6A0" />
      </g>
    </g>

    <!-- Cards & Elevation -->
    <g transform="translate(0, 340)">
      <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">CONTAINER CARDS</text>
      
      <!-- Card Standard -->
      <g transform="translate(0, 20)">
        <rect width="360" height="150" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="24" y="36" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">Standard Card (#101217)</text>
        <text x="24" y="60" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">1px stroke #242832, 16px corner radius</text>
        <rect x="24" y="90" width="80" height="28" rx="6" fill="#171A21" stroke="#242832" stroke-width="1" />
        <text x="64" y="108" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">Action</text>
      </g>

      <!-- Card with Glow -->
      <g transform="translate(390, 20)">
        <rect width="380" height="150" rx="16" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.35" stroke-width="1" />
        <circle cx="340" cy="40" r="60" fill="url(#geminiAIGlow)" />
        <text x="24" y="36" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">Glow Highlight Card</text>
        <text x="24" y="60" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Radial violet illumination, purple accent border</text>
        <rect x="24" y="90" width="120" height="28" rx="6" fill="#7C5CFF" />
        <text x="84" y="108" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Resume Stage</text>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 2. DASHBOARD / HOME SCREEN (1440 x 1024)
// ==========================================
function generateDashboardSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Base -->
  <rect width="1440" height="1024" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  ${renderSidebar('/dashboard')}
  ${renderTopHeader('Overview')}

  <!-- Main Canvas (1120px max-width) -->
  <g id="MainContent" transform="translate(288, 88)">
    <!-- Header -->
    <g id="Page_Header">
      <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">Good morning, Aarav 👋</text>
      <text y="28" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Here's your progress toward becoming a <tspan fill="#F2F3F5" font-weight="600">Data Analyst</tspan>.</text>
      
      <!-- Actions -->
      <g transform="translate(850, 0)">
        <rect width="120" height="36" rx="8" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="60" y="22" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Review Skill Gaps</text>
        <rect x="130" y="0" width="140" height="36" rx="8" fill="#7C5CFF" />
        <text x="200" y="22" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Continue Learning →</text>
      </g>
    </g>

    <line x1="0" y1="52" x2="1120" y2="52" stroke="#1B1E25" stroke-width="1" />

    <!-- HERO CAREER READINESS CARD -->
    <g id="Hero_Card" transform="translate(0, 72)">
      <rect width="1120" height="190" rx="16" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
      <rect width="1120" height="190" rx="16" fill="url(#cardHeroGlow)" />
      
      <!-- Content Left -->
      <g transform="translate(32, 24)">
        <rect width="96" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
        <text x="48" y="15" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">TARGET CAREER</text>
        <text x="110" y="15" fill="#687083" font-family="monospace" font-size="11">Paced for 4-6 hrs/week</text>

        <text y="52" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">Data Analyst</text>
        <rect x="180" y="32" width="160" height="22" rx="4" fill="#27D6A0" fill-opacity="0.12" stroke="#27D6A0" stroke-opacity="0.25" stroke-width="1" />
        <text x="260" y="47" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">+12% readiness this week</text>

        <g transform="translate(0, 80)">
          <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Career Readiness</text>
          <text x="560" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="800" text-anchor="end">48%</text>
          <rect y="10" width="560" height="8" rx="4" fill="#0A0B0F" stroke="#1B1E25" stroke-width="1" />
          <rect y="10" width="268" height="8" rx="4" fill="url(#readinessGrad)" />
          <text y="32" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">You are outperforming 78% of peers aiming for junior data analytics roles.</text>
        </g>
      </g>

      <!-- Next Gate Right Callout -->
      <g transform="translate(780, 24)">
        <rect width="308" height="142" rx="12" fill="#0A0B0F" stroke="#1B1E25" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">NEXT MAJOR GATE:</text>
          <text y="24" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Stage 02 SQL Query Test</text>
          <text y="42" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">✓ Unlocks Internship Readiness at 75%</text>
          <rect y="58" width="268" height="38" rx="8" fill="#7C5CFF" />
          <text x="134" y="82" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Resume Stage 02: SQL →</text>
        </g>
      </g>
    </g>

    <!-- 4 STATISTICS CARDS -->
    <g id="Stat_Cards" transform="translate(0, 280)">
      <!-- Card 1: Skills -->
      <g transform="translate(0, 0)">
        <rect width="262" height="120" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700">SKILLS ACQUIRED</text>
          <circle cx="204" cy="4" r="14" fill="#27D6A0" fill-opacity="0.12" />
          <text x="204" y="8" fill="#27D6A0" font-size="12" text-anchor="middle">✓</text>
          <text y="38" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="24" font-weight="800">2 / 7</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">completed skills</text>
          <text y="78" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">View skill gaps →</text>
        </g>
      </g>

      <!-- Card 2: Projects -->
      <g transform="translate(286, 0)">
        <rect width="262" height="120" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700">PORTFOLIO PROJECTS</text>
          <circle cx="204" cy="4" r="14" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="204" y="8" fill="#8B6CFF" font-size="12" text-anchor="middle">📁</text>
          <text y="38" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="24" font-weight="800">1 / 4</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">recruiter deliverables</text>
          <text y="78" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Review projects →</text>
        </g>
      </g>

      <!-- Card 3: Streak -->
      <g transform="translate(572, 0)">
        <rect width="262" height="120" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700">LEARNING STREAK</text>
          <circle cx="204" cy="4" r="14" fill="#EAB04B" fill-opacity="0.12" />
          <text x="204" y="8" fill="#EAB04B" font-size="12" text-anchor="middle">🔥</text>
          <text y="38" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="24" font-weight="800">8 Days</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">active study rhythm</text>
          <text y="78" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Top 15% student</text>
        </g>
      </g>

      <!-- Card 4: Readiness -->
      <g transform="translate(858, 0)">
        <rect width="262" height="120" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700">TARGET READINESS</text>
          <circle cx="204" cy="4" r="14" fill="#27D6A0" fill-opacity="0.12" />
          <text x="204" y="8" fill="#27D6A0" font-size="12" text-anchor="middle">📈</text>
          <text y="38" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="24" font-weight="800">48%</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">interview ready</text>
          <text y="78" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">Roadmap details →</text>
        </g>
      </g>
    </g>

    <!-- ACTIVE ROADMAP STAGE SPOTLIGHT -->
    <g id="Roadmap_Spotlight" transform="translate(0, 420)">
      <rect width="1120" height="230" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
      <g transform="translate(32, 28)">
        <rect width="84" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
        <text x="42" y="15" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">STAGE 02</text>
        <text x="96" y="15" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">● CURRENT FOCUS</text>

        <text y="50" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="20" font-weight="800">SQL &amp; Relational Databases</text>
        <text y="70" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">PostgreSQL, complex multi-table JOINs, aggregations, window functions</text>

        <!-- Task Checklist Preview -->
        <g transform="translate(0, 96)">
          <!-- Task 1 (Done) -->
          <g transform="translate(0, 0)">
            <rect width="18" height="18" rx="4" fill="#27D6A0" />
            <text x="9" y="14" fill="#000000" font-size="12" font-weight="bold" text-anchor="middle">✓</text>
            <text x="28" y="14" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" text-decoration="line-through">Relational schemas and primary/foreign keys</text>
          </g>
          <!-- Task 2 (Current) -->
          <g transform="translate(0, 30)">
            <rect width="18" height="18" rx="4" fill="#13151B" stroke="#7C5CFF" stroke-width="1.5" />
            <circle cx="9" cy="9" r="4" fill="#7C5CFF" />
            <text x="28" y="14" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">Practice INNER, LEFT, and FULL JOINs on e-commerce schema</text>
            <rect x="440" y="0" width="80" height="20" rx="4" fill="#EAB04B" fill-opacity="0.12" stroke="#EAB04B" stroke-opacity="0.3" stroke-width="1" />
            <text x="480" y="13" fill="#EAB04B" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">BOTTLENECK</text>
          </g>
          <!-- Task 3 -->
          <g transform="translate(0, 60)">
            <rect width="18" height="18" rx="4" fill="#13151B" stroke="#242832" stroke-width="1" />
            <text x="28" y="14" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Aggregate functions (GROUP BY, HAVING, COUNT DISTINCT)</text>
          </g>
        </g>
      </g>
    </g>

    <!-- AI PROMPTS BAR -->
    <g id="AI_Prompt_Suggestions" transform="translate(0, 670)">
      <rect width="1120" height="60" rx="12" fill="#13151B" stroke="#242832" stroke-width="1" />
      <g transform="translate(24, 20)">
        <text fill="#8B6CFF" font-size="13">✨</text>
        <text x="22" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">Ask SkillBridge AI:</text>
        
        <rect x="150" y="-8" width="180" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="240" y="12" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"What should I learn next?"</text>

        <rect x="345" y="-8" width="180" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="435" y="12" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"Suggest a project for me"</text>

        <rect x="540" y="-8" width="210" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="645" y="12" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"Am I ready for an internship?"</text>

        <rect x="765" y="-8" width="150" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="840" y="12" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"Why do I need SQL?"</text>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 3. AI CAREER ASSISTANT SCREEN (1440 x 1024)
// ==========================================
function generateAIAssistantSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Base -->
  <rect width="1440" height="1024" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  ${renderSidebar('/ai')}
  ${renderTopHeader('SkillBridge AI Career Assistant')}

  <g id="MainContent" transform="translate(288, 88)">
    <!-- Header -->
    <g id="Page_Header">
      <rect width="150" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
      <text x="75" y="15" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">CAREER INTELLIGENCE</text>
      <text y="46" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">Ask SkillBridge AI</text>
      <text y="68" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Get real-time guidance grounded in your Data Analyst roadmap and skills.</text>

      <!-- Live Provider Badge -->
      <g transform="translate(940, 24)">
        <rect width="160" height="28" rx="14" fill="#27D6A0" fill-opacity="0.12" stroke="#27D6A0" stroke-opacity="0.3" stroke-width="1" />
        <circle cx="16" cy="14" r="3.5" fill="#27D6A0" />
        <text x="86" y="18" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Gemini AI Connected</text>
      </g>
    </g>

    <line x1="0" y1="84" x2="1120" y2="84" stroke="#1B1E25" stroke-width="1" />

    <!-- Two-Column Layout -->
    <g transform="translate(0, 100)">
      <!-- Left Column: Live Parameters Anchor (280px) -->
      <g id="Context_Sidebar" transform="translate(0, 0)">
        <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="0.08em">LIVE PARAMETERS</text>
        
        <rect y="16" width="280" height="520" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        
        <!-- Parameter 1: Candidate -->
        <g transform="translate(20, 36)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">CANDIDATE</text>
          <text y="18" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">Aarav, 21</text>
          <text y="32" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Computer Science Student</text>
        </g>
        <line x1="20" y1="88" x2="260" y2="88" stroke="#1B1E25" stroke-width="1" />

        <!-- Parameter 2: Target Role -->
        <g transform="translate(20, 106)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">TARGET ROLE</text>
          <text y="18" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">Data Analyst</text>
        </g>
        <line x1="20" y1="150" x2="260" y2="150" stroke="#1B1E25" stroke-width="1" />

        <!-- Parameter 3: Readiness -->
        <g transform="translate(20, 168)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">CAREER READINESS</text>
          <text x="240" y="16" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="800" text-anchor="end">48%</text>
          <rect y="22" width="240" height="6" rx="3" fill="#0A0B0F" />
          <rect y="22" width="115" height="6" rx="3" fill="url(#readinessGrad)" />
        </g>
        <line x1="20" y1="214" x2="260" y2="214" stroke="#1B1E25" stroke-width="1" />

        <!-- Parameter 4: Current Focus -->
        <g transform="translate(20, 232)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">CURRENT FOCUS</text>
          <text y="18" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700">Stage 02: SQL &amp; Databases</text>
          <text y="34" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Multi-table JOINs</text>
        </g>
        <line x1="20" y1="288" x2="260" y2="288" stroke="#1B1E25" stroke-width="1" />

        <!-- Parameter 5: Primary Bottleneck -->
        <g transform="translate(20, 306)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">PRIMARY BOTTLENECK</text>
          <rect y="10" width="240" height="26" rx="6" fill="#E15C62" fill-opacity="0.12" stroke="#E15C62" stroke-opacity="0.3" stroke-width="1" />
          <text x="12" y="27" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600">⚠️ SQL Queries &amp; JOINs (25%)</text>
        </g>
        <line x1="20" y1="364" x2="260" y2="364" stroke="#1B1E25" stroke-width="1" />

        <!-- Parameter 6: Time Budget -->
        <g transform="translate(20, 382)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">WEEKLY BUDGET</text>
          <text y="18" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">4-6 hrs/week</text>
        </g>
      </g>

      <!-- Right Column: Interactive Chat (816px) -->
      <g id="Chat_Container" transform="translate(304, 0)">
        <rect width="816" height="536" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />

        <!-- Chat Header -->
        <g id="Chat_Header" transform="translate(24, 18)">
          <rect width="32" height="32" rx="8" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <text x="16" y="21" fill="#8B6CFF" font-size="14" text-anchor="middle">✨</text>
          <text x="44" y="16" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">SkillBridge Career Advisor</text>
          <text x="44" y="29" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">● Grounded in Data Analyst hiring criteria &amp; live progress</text>
          
          <rect x="670" y="2" width="94" height="26" rx="6" fill="#171A21" stroke="#242832" stroke-width="1" />
          <text x="717" y="19" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Clear Chat</text>
        </g>
        <line x1="0" y1="62" x2="816" y2="62" stroke="#1B1E25" stroke-width="1" />

        <!-- Message 1: User Prompt -->
        <g id="Message_User" transform="translate(560, 80)">
          <rect width="232" height="42" rx="12" fill="#7C5CFF" />
          <text x="16" y="26" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="500">What should I learn next?</text>
        </g>

        <!-- Message 2: Live AI Career Advisor Response -->
        <g id="Message_AI" transform="translate(24, 136)">
          <rect width="32" height="32" rx="8" fill="url(#primaryPurpleGrad)" />
          <text x="16" y="21" fill="#FFFFFF" font-size="13" text-anchor="middle">✨</text>
          
          <!-- AI Bubble -->
          <g transform="translate(44, 0)">
            <rect width="724" height="270" rx="16" fill="#13151B" stroke="#242832" stroke-width="1" />
            
            <g transform="translate(24, 18)">
              <!-- Context Tag -->
              <rect width="180" height="20" rx="4" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
              <text x="90" y="14" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">STAGE 02: SQL &amp; DATABASES</text>

              <text y="44" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Your Immediate Focus: Conquering SQL JOINs</text>
              <text y="64" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Since your primary bottleneck is <tspan fill="#F2F3F5" font-weight="600">SQL Queries &amp; Multi-table JOINs (25%)</tspan>, you must master multi-table logic before proceeding to Python.</text>

              <!-- SQL Code Box -->
              <g transform="translate(0, 80)">
                <rect width="676" height="66" rx="8" fill="#0A0B0F" stroke="#1B1E25" stroke-width="1" />
                <text x="16" y="22" fill="#8B6CFF" font-family="monospace" font-size="11">SELECT <tspan fill="#F2F3F5">c.customer_id, COUNT(o.order_id) AS total_orders</tspan></text>
                <text x="16" y="40" fill="#8B6CFF" font-family="monospace" font-size="11">FROM <tspan fill="#F2F3F5">customers c</tspan> LEFT JOIN <tspan fill="#F2F3F5">orders o ON c.customer_id = o.customer_id</tspan></text>
                <text x="16" y="58" fill="#8B6CFF" font-family="monospace" font-size="11">GROUP BY <tspan fill="#F2F3F5">c.customer_id;</tspan></text>
              </g>

              <!-- Weekly Hours Plan -->
              <text y="172" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">5-Hour Weekly Plan: <tspan fill="#949BAD" font-weight="400">Hours 1-2 Syntax drills • Hours 3-4 E-commerce queries • Hour 5 Debugging</tspan></text>

              <!-- Action Button inside bubble -->
              <g transform="translate(0, 194)">
                <rect width="180" height="32" rx="6" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.4" stroke-width="1" />
                <text x="90" y="20" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">View Stage in Roadmap →</text>
              </g>
            </g>
          </g>
        </g>

        <!-- Quick Suggestions Pill Bar -->
        <g id="Quick_Pills" transform="translate(0, 424)">
          <line x1="0" y1="0" x2="816" y2="0" stroke="#1B1E25" stroke-width="1" />
          <text x="24" y="26" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Suggestions:</text>
          
          <rect x="100" y="10" width="160" height="26" rx="13" fill="#13151B" stroke="#242832" stroke-width="1" />
          <text x="180" y="27" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"Suggest a project for me"</text>

          <rect x="270" y="10" width="180" height="26" rx="13" fill="#13151B" stroke="#242832" stroke-width="1" />
          <text x="360" y="27" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"Am I ready for an internship?"</text>

          <rect x="460" y="10" width="140" height="26" rx="13" fill="#13151B" stroke="#242832" stroke-width="1" />
          <text x="530" y="27" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">"Why do I need SQL?"</text>
        </g>

        <!-- Chat Input Form -->
        <g id="Chat_Input" transform="translate(16, 470)">
          <rect width="784" height="48" rx="12" fill="#13151B" stroke="#242832" stroke-width="1" />
          <text x="20" y="29" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Ask SkillBridge AI about your Data Analyst roadmap, skills, or projects...</text>
          
          <rect x="704" y="8" width="68" height="32" rx="8" fill="#7C5CFF" />
          <text x="738" y="28" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Send</text>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 4. PROFILE & PROGRESS SCREEN (1440 x 1024)
// ==========================================
function generateProfileSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Base -->
  <rect width="1440" height="1024" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  ${renderSidebar('/profile')}
  ${renderTopHeader('Profile & Career Progress')}

  <g id="MainContent" transform="translate(288, 88)">
    <!-- Header -->
    <g id="Page_Header">
      <rect width="130" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
      <text x="65" y="15" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">CANDIDATE ACCOUNT</text>
      <text y="46" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">My Progress</text>
      <text y="68" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Track your milestones, completed projects, verified skills, and roadmap settings.</text>

      <g transform="translate(860, 20)">
        <rect width="120" height="34" rx="8" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="60" y="21" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Share Roadmap</text>
        <rect x="130" y="0" width="130" height="34" rx="8" fill="#171A21" stroke="#242832" stroke-width="1" />
        <text x="195" y="21" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Reset Demo Data</text>
      </g>
    </g>

    <line x1="0" y1="84" x2="1120" y2="84" stroke="#1B1E25" stroke-width="1" />

    <!-- PROFILE OVERVIEW CARD -->
    <g id="Profile_Overview" transform="translate(0, 100)">
      <rect width="1120" height="150" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
      
      <g transform="translate(32, 28)">
        <!-- Avatar -->
        <circle cx="48" cy="48" r="46" fill="#171A21" stroke="#7C5CFF" stroke-width="2" />
        <text x="48" y="55" fill="#A38BFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800" text-anchor="middle">A</text>
        
        <g transform="translate(114, 16)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="22" font-weight="800">Aarav</text>
          <rect x="80" y="-16" width="94" height="20" rx="10" fill="#27D6A0" fill-opacity="0.12" stroke="#27D6A0" stroke-opacity="0.25" stroke-width="1" />
          <text x="127" y="-2" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Active Student</text>

          <text y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Computer Science Student • Age 21</text>
          <text y="46" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">🎯 Target: <tspan font-weight="700">Data Analyst</tspan> • 🕒 4-6 hrs/week • 🔥 8-Day Streak</text>
        </g>

        <!-- Readiness Gauge Box Right -->
        <g transform="translate(760, 10)">
          <rect width="280" height="80" rx="12" fill="#13151B" stroke="#1B1E25" stroke-width="1" />
          <g transform="translate(20, 18)">
            <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Overall Career Readiness</text>
            <text x="240" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="800" text-anchor="end">48%</text>
            <rect y="12" width="240" height="6" rx="3" fill="#0A0B0F" />
            <rect y="12" width="115" height="6" rx="3" fill="url(#readinessGrad)" />
            <text y="36" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">Stage 02 in progress • 3 projects remaining</text>
          </g>
        </g>
      </g>
    </g>

    <!-- 3 PROGRESS METRICS -->
    <g id="Metrics_Row" transform="translate(0, 270)">
      <g transform="translate(0, 0)">
        <rect width="354" height="96" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(24, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">SKILLS ACQUIRED</text>
          <text y="32" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="22" font-weight="800">2 completed</text>
          <text y="50" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Out of 7 target competency areas</text>
        </g>
      </g>

      <g transform="translate(382, 0)">
        <rect width="354" height="96" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(24, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">PORTFOLIO PROJECTS</text>
          <text y="32" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="22" font-weight="800">1 completed</text>
          <text y="50" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Out of 4 recruiter portfolio deliverables</text>
        </g>
      </g>

      <g transform="translate(766, 0)">
        <rect width="354" height="96" rx="12" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(24, 20)">
          <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700">LEARNING MODULES</text>
          <text y="32" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="22" font-weight="800">4 completed</text>
          <text y="50" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Out of 16 curriculum deliverables</text>
        </g>
      </g>
    </g>

    <!-- ACHIEVEMENTS & BADGES GRID -->
    <g id="Achievements_Section" transform="translate(0, 390)">
      <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">🏆 ACHIEVEMENTS &amp; BADGES</text>
      <text x="1120" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" text-anchor="end">2 / 6 Unlocked</text>

      <g transform="translate(0, 24)">
        <!-- Badge 1: Earned -->
        <g transform="translate(0, 0)">
          <rect width="354" height="84" rx="12" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <circle cx="36" cy="42" r="18" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="36" y="47" fill="#8B6CFF" font-size="16" text-anchor="middle">🎯</text>
          <text x="68" y="32" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">First Milestone</text>
          <rect x="175" y="19" width="48" height="18" rx="4" fill="#27D6A0" fill-opacity="0.12" />
          <text x="199" y="31" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="9" font-weight="700" text-anchor="middle">EARNED</text>
          <text x="68" y="52" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Completed Stage 01 Spreadsheet Foundations</text>
        </g>

        <!-- Badge 2: Earned -->
        <g transform="translate(382, 0)">
          <rect width="354" height="84" rx="12" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <circle cx="36" cy="42" r="18" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="36" y="47" fill="#8B6CFF" font-size="16" text-anchor="middle">🔥</text>
          <text x="68" y="32" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">Consistency Champion</text>
          <rect x="230" y="19" width="48" height="18" rx="4" fill="#27D6A0" fill-opacity="0.12" />
          <text x="254" y="31" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="9" font-weight="700" text-anchor="middle">EARNED</text>
          <text x="68" y="52" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Maintained an active 7+ day study streak</text>
        </g>

        <!-- Badge 3: In Progress -->
        <g transform="translate(766, 0)">
          <rect width="354" height="84" rx="12" fill="#101217" stroke="#1B1E25" stroke-width="1" opacity="0.6" />
          <circle cx="36" cy="42" r="18" fill="#171A21" />
          <text x="36" y="47" fill="#687083" font-size="16" text-anchor="middle">💾</text>
          <text x="68" y="32" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="700">SQL Explorer</text>
          <text x="68" y="52" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Complete all 4 Stage 02 SQL modules</text>
        </g>
      </g>
    </g>

    <!-- SKILL INVENTORY -->
    <g id="Skill_Inventory" transform="translate(0, 520)">
      <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">⚡ VERIFIED SKILL INVENTORY</text>
      
      <g transform="translate(0, 20)">
        <!-- Strong -->
        <rect width="180" height="34" rx="8" fill="#13151B" stroke="#27D6A0" stroke-opacity="0.3" stroke-width="1" />
        <text x="14" y="22" fill="#27D6A0" font-size="12">✓</text>
        <text x="32" y="21" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">Microsoft Excel (85%)</text>

        <rect x="192" width="200" height="34" rx="8" fill="#13151B" stroke="#27D6A0" stroke-opacity="0.3" stroke-width="1" />
        <text x="206" y="22" fill="#27D6A0" font-size="12">✓</text>
        <text x="224" y="21" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">Data Cleaning (90%)</text>

        <!-- Developing -->
        <rect x="404" width="200" height="34" rx="8" fill="#13151B" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
        <text x="418" y="22" fill="#8B6CFF" font-size="12">⏳</text>
        <text x="436" y="21" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">Python / Pandas (55%)</text>

        <!-- Gap -->
        <rect x="616" width="180" height="34" rx="8" fill="#13151B" stroke="#E15C62" stroke-opacity="0.3" stroke-width="1" />
        <text x="630" y="22" fill="#E15C62" font-size="12">⚠️</text>
        <text x="648" y="21" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">SQL JOINs (25%)</text>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 5. PORTFOLIO PROJECTS SCREEN (1440 x 1024)
// ==========================================
function generateProjectsSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Base -->
  <rect width="1440" height="1024" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  ${renderSidebar('/projects')}
  ${renderTopHeader('Portfolio Projects')}

  <g id="MainContent" transform="translate(288, 88)">
    <!-- Header -->
    <g id="Page_Header">
      <rect width="120" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
      <text x="60" y="15" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">PROOF OF WORK</text>
      <text y="46" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">Portfolio Projects</text>
      <text y="68" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Real-world deliverables aligned with Data Analyst technical interviews and recruiter reviews.</text>

      <g transform="translate(940, 20)">
        <rect width="140" height="34" rx="8" fill="#7C5CFF" />
        <text x="70" y="21" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Go to Active Stage →</text>
      </g>
    </g>

    <line x1="0" y1="84" x2="1120" y2="84" stroke="#1B1E25" stroke-width="1" />

    <!-- 2x2 PROJECT CARDS GRID -->
    <g id="Projects_Grid" transform="translate(0, 108)">
      <!-- Project 1: Completed -->
      <g transform="translate(0, 0)">
        <rect width="544" height="230" rx="16" fill="#101217" stroke="#1B1E25" stroke-width="1" />
        <g transform="translate(28, 24)">
          <text fill="#687083" font-family="monospace" font-size="11">STAGE 01: SPREADSHEETS</text>
          <rect x="400" y="-14" width="88" height="22" rx="11" fill="#27D6A0" fill-opacity="0.12" stroke="#27D6A0" stroke-opacity="0.25" stroke-width="1" />
          <text x="444" y="1" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">COMPLETED</text>

          <text y="36" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="800">E-Commerce Sales Performance Dashboard</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Interactive multi-tab executive model analyzing revenue trends, cohort retention, and margin variances.</text>

          <g transform="translate(0, 88)">
            <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Deliverables Completed</text>
            <text x="488" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">4 / 4 tasks (100%)</text>
            <rect y="8" width="488" height="6" rx="3" fill="#0A0B0F" />
            <rect y="8" width="488" height="6" rx="3" fill="#27D6A0" />
          </g>

          <line x1="0" y1="130" x2="488" y2="130" stroke="#1B1E25" stroke-width="1" />
          <g transform="translate(0, 148)">
            <text fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">🔗 View GitHub Repository</text>
            <rect x="388" y="-8" width="100" height="28" rx="6" fill="#13151B" stroke="#242832" stroke-width="1" />
            <text x="438" y="10" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" text-anchor="middle">Stage Details →</text>
          </g>
        </g>
      </g>

      <!-- Project 2: In Progress -->
      <g transform="translate(576, 0)">
        <rect width="544" height="230" rx="16" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.35" stroke-width="1" />
        <g transform="translate(28, 24)">
          <text fill="#8B6CFF" font-family="monospace" font-size="11">STAGE 02: SQL &amp; DATABASES</text>
          <rect x="390" y="-14" width="98" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <text x="439" y="1" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">IN PROGRESS</text>

          <text y="36" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="800">Multi-Table Customer Churn Database</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">PostgreSQL relational schema querying 10,000+ orders across 4 tables with complex JOIN queries.</text>

          <g transform="translate(0, 88)">
            <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Deliverables Completed</text>
            <text x="488" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">2 / 5 tasks (35%)</text>
            <rect y="8" width="488" height="6" rx="3" fill="#0A0B0F" />
            <rect y="8" width="170" height="6" rx="3" fill="url(#primaryPurpleGrad)" />
          </g>

          <line x1="0" y1="130" x2="488" y2="130" stroke="#1B1E25" stroke-width="1" />
          <g transform="translate(0, 148)">
            <text fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">🔗 Active Repository</text>
            <rect x="388" y="-8" width="100" height="28" rx="6" fill="#7C5CFF" />
            <text x="438" y="10" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Continue →</text>
          </g>
        </g>
      </g>

      <!-- Project 3: Upcoming -->
      <g transform="translate(0, 256)">
        <rect width="544" height="210" rx="16" fill="#101217" stroke="#1B1E25" stroke-width="1" opacity="0.6" />
        <g transform="translate(28, 24)">
          <text fill="#687083" font-family="monospace" font-size="11">STAGE 03: PYTHON</text>
          <rect x="400" y="-14" width="88" height="22" rx="11" fill="#171A21" />
          <text x="444" y="1" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">UPCOMING</text>

          <text y="36" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="800">Exploratory Python Data Pipeline</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Automated cleaning and outlier detection script with Pandas, NumPy, and Seaborn visual outputs.</text>

          <g transform="translate(0, 88)">
            <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">0 / 4 deliverables • Locked until Stage 02 complete</text>
          </g>
        </g>
      </g>

      <!-- Project 4: Upcoming -->
      <g transform="translate(576, 256)">
        <rect width="544" height="210" rx="16" fill="#101217" stroke="#1B1E25" stroke-width="1" opacity="0.6" />
        <g transform="translate(28, 24)">
          <text fill="#687083" font-family="monospace" font-size="11">STAGE 04: BUSINESS INTELLIGENCE</text>
          <rect x="400" y="-14" width="88" height="22" rx="11" fill="#171A21" />
          <text x="444" y="1" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">UPCOMING</text>

          <text y="36" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="800">Executive BI Decision Matrix</text>
          <text y="58" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Tableau enterprise dashboard with drill-down KPIs and automated data source refresh.</text>

          <g transform="translate(0, 88)">
            <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">0 / 3 deliverables • Final Capstone</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 6. SKILL GAP SCREEN (1440 x 1024)
// ==========================================
function generateSkillGapSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Base -->
  <rect width="1440" height="1024" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  ${renderSidebar('/skill-gap')}
  ${renderTopHeader('Skill Gap Analysis')}

  <g id="MainContent" transform="translate(288, 88)">
    <!-- Header -->
    <g id="Page_Header">
      <rect width="170" height="22" rx="11" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
      <text x="85" y="15" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">DIAGNOSTICS &amp; GAP ANALYSIS</text>
      <text y="46" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">Your Skill Gap</text>
      <text y="68" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Here's what stands between you and your target role: <tspan fill="#F2F3F5" font-weight="600">Data Analyst</tspan>.</text>

      <g transform="translate(860, 20)">
        <rect width="120" height="34" rx="8" fill="#101217" stroke="#242832" stroke-width="1" />
        <text x="60" y="21" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Re-scan Market</text>
        <rect x="130" y="0" width="130" height="34" rx="8" fill="#7C5CFF" />
        <text x="195" y="21" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700" text-anchor="middle">View My Roadmap →</text>
      </g>
    </g>

    <line x1="0" y1="84" x2="1120" y2="84" stroke="#1B1E25" stroke-width="1" />

    <!-- AI MARKET DIAGNOSTIC CALLOUT -->
    <g id="Diagnostic_Banner" transform="translate(0, 100)">
      <rect width="1120" height="110" rx="16" fill="#101217" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
      <circle cx="1060" cy="50" r="60" fill="url(#geminiAIGlow)" />
      
      <g transform="translate(28, 24)">
        <rect width="130" height="22" rx="4" fill="#E15C62" fill-opacity="0.12" stroke="#E15C62" stroke-opacity="0.3" stroke-width="1" />
        <text x="65" y="15" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">PRIMARY BOTTLENECK</text>
        
        <text y="46" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="18" font-weight="800">SQL Queries &amp; Multi-table JOINs (25% Proficiency)</text>
        <text y="68" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Present in <tspan fill="#27D6A0" font-weight="700">94% of Data Analyst job postings</tspan>. Resolving this in Stage 02 is projected to boost your candidate readiness score from 48% to 62%.</text>
      </g>
    </g>

    <!-- FILTER PILLS -->
    <g id="Filter_Pills" transform="translate(0, 230)">
      <!-- All -->
      <rect width="64" height="32" rx="16" fill="#7C5CFF" />
      <text x="32" y="20" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">All (7)</text>

      <!-- Strong -->
      <rect x="76" width="90" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
      <text x="121" y="20" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Strong (2)</text>

      <!-- Developing -->
      <rect x="178" width="115" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
      <text x="235" y="20" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Developing (2)</text>

      <!-- Gaps -->
      <rect x="305" width="115" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
      <text x="362" y="20" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Skill Gaps (3)</text>
    </g>

    <!-- SKILLS MATRIX (3x2 GRID) -->
    <g id="Skills_Grid" transform="translate(0, 280)">
      <!-- Skill 1: Excel -->
      <g transform="translate(0, 0)">
        <rect width="354" height="130" rx="14" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Microsoft Excel</text>
          <rect x="230" y="-14" width="84" height="20" rx="10" fill="#27D6A0" fill-opacity="0.12" stroke="#27D6A0" stroke-opacity="0.25" stroke-width="1" />
          <text x="272" y="0" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">STRONG</text>

          <text y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Formulas, XLOOKUP, Pivot Tables</text>
          <text y="54" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">PROFICIENCY</text>
          <text x="314" y="54" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">85%</text>
          <rect y="60" width="314" height="6" rx="3" fill="#0A0B0F" />
          <rect y="60" width="266" height="6" rx="3" fill="#27D6A0" />
        </g>
      </g>

      <!-- Skill 2: Python -->
      <g transform="translate(382, 0)">
        <rect width="354" height="130" rx="14" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Python (Pandas)</text>
          <rect x="210" y="-14" width="104" height="20" rx="10" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <text x="262" y="0" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">DEVELOPING</text>

          <text y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Dataframes, Groupby, Cleaning</text>
          <text y="54" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">PROFICIENCY</text>
          <text x="314" y="54" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">55%</text>
          <rect y="60" width="314" height="6" rx="3" fill="#0A0B0F" />
          <rect y="60" width="172" height="6" rx="3" fill="url(#primaryPurpleGrad)" />
        </g>
      </g>

      <!-- Skill 3: SQL -->
      <g transform="translate(766, 0)">
        <rect width="354" height="130" rx="14" fill="#101217" stroke="#E15C62" stroke-opacity="0.4" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">SQL Queries &amp; JOINs</text>
          <rect x="220" y="-14" width="94" height="20" rx="10" fill="#E15C62" fill-opacity="0.12" stroke="#E15C62" stroke-opacity="0.3" stroke-width="1" />
          <text x="267" y="0" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">SKILL GAP</text>

          <text y="24" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Multi-table queries, Aggregations</text>
          <text y="54" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">PROFICIENCY</text>
          <text x="314" y="54" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">25%</text>
          <rect y="60" width="314" height="6" rx="3" fill="#0A0B0F" />
          <rect y="60" width="78" height="6" rx="3" fill="#E15C62" />
        </g>
      </g>

      <!-- Skill 4: Data Storytelling -->
      <g transform="translate(0, 150)">
        <rect width="354" height="130" rx="14" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Data Storytelling</text>
          <rect x="210" y="-14" width="104" height="20" rx="10" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <text x="262" y="0" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">DEVELOPING</text>

          <text y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Executive slides, Business context</text>
          <text y="54" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">PROFICIENCY</text>
          <text x="314" y="54" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">50%</text>
          <rect y="60" width="314" height="6" rx="3" fill="#0A0B0F" />
          <rect y="60" width="157" height="6" rx="3" fill="url(#primaryPurpleGrad)" />
        </g>
      </g>

      <!-- Skill 5: Tableau -->
      <g transform="translate(382, 150)">
        <rect width="354" height="130" rx="14" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Tableau / Power BI</text>
          <rect x="220" y="-14" width="94" height="20" rx="10" fill="#E15C62" fill-opacity="0.12" stroke="#E15C62" stroke-opacity="0.3" stroke-width="1" />
          <text x="267" y="0" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">SKILL GAP</text>

          <text y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Dashboards, Parameters, Calculated fields</text>
          <text y="54" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">PROFICIENCY</text>
          <text x="314" y="54" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">20%</text>
          <rect y="60" width="314" height="6" rx="3" fill="#0A0B0F" />
          <rect y="60" width="62" height="6" rx="3" fill="#E15C62" />
        </g>
      </g>

      <!-- Skill 6: Business Metrics -->
      <g transform="translate(766, 150)">
        <rect width="354" height="130" rx="14" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(20, 20)">
          <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="15" font-weight="700">Business Metrics (CAC, LTV)</text>
          <rect x="220" y="-14" width="94" height="20" rx="10" fill="#E15C62" fill-opacity="0.12" stroke="#E15C62" stroke-opacity="0.3" stroke-width="1" />
          <text x="267" y="0" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">SKILL GAP</text>

          <text y="24" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Retention, Churn rate, Cohort analysis</text>
          <text y="54" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">PROFICIENCY</text>
          <text x="314" y="54" fill="#E15C62" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="end">30%</text>
          <rect y="60" width="314" height="6" rx="3" fill="#0A0B0F" />
          <rect y="60" width="94" height="6" rx="3" fill="#E15C62" />
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 7. PLATFORM SETTINGS SCREEN (1440 x 1024)
// ==========================================
function generateSettingsSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${SHARED_DEFS}
  <!-- Canvas Base -->
  <rect width="1440" height="1024" fill="#07080B" />
  <rect width="1440" height="400" fill="url(#purpleGlowTop)" />

  ${renderSidebar('/settings')}
  ${renderTopHeader('Platform Settings')}

  <g id="MainContent" transform="translate(288, 88)">
    <!-- Header -->
    <g id="Page_Header">
      <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="28" font-weight="800">Platform Settings</text>
      <text y="28" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13">Manage your account preferences, local persistence, and roadmap synchronization.</text>
    </g>

    <line x1="0" y1="52" x2="1120" y2="52" stroke="#1B1E25" stroke-width="1" />

    <!-- Settings Cards Column (max 720px) -->
    <g id="Settings_Cards" transform="translate(0, 80)">
      <!-- Panel 1: Theme -->
      <g transform="translate(0, 0)">
        <rect width="720" height="110" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(28, 24)">
          <circle cx="16" cy="16" r="16" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="16" y="21" fill="#8B6CFF" font-size="14" text-anchor="middle">🌙</text>
          
          <text x="44" y="14" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">Quantix Dark Aesthetic</text>
          <text x="44" y="32" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">SkillBridge uses the high-contrast Obsidian &amp; subtle purple lighting palette.</text>
          
          <g transform="translate(0, 48)">
            <text fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">✓ Configured to #07080B Deep Black &amp; #7C5CFF Purple Accent</text>
          </g>
        </g>
      </g>

      <!-- Panel 2: Demo State & Persistence -->
      <g transform="translate(0, 130)">
        <rect width="720" height="130" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(28, 24)">
          <circle cx="16" cy="16" r="16" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="16" y="21" fill="#8B6CFF" font-size="14" text-anchor="middle">💾</text>

          <text x="44" y="14" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">Demo State &amp; Local Storage</text>
          <text x="44" y="32" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">All checklist toggles, customized skills, and chat logs are stored locally.</text>

          <g transform="translate(0, 56)">
            <text fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Want to return to Aarav's initial state?</text>
            <rect x="520" y="-12" width="144" height="34" rx="8" fill="#171A21" stroke="#242832" stroke-width="1" />
            <text x="592" y="10" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Reset to Aarav Demo</text>
          </g>
        </g>
      </g>

      <!-- Panel 3: Study Reminders -->
      <g transform="translate(0, 280)">
        <rect width="720" height="120" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(28, 24)">
          <circle cx="16" cy="16" r="16" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="16" y="21" fill="#8B6CFF" font-size="14" text-anchor="middle">🔔</text>

          <text x="44" y="14" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">Study Reminders</text>
          <text x="44" y="32" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Get daily notifications to keep your 8-day learning streak active.</text>

          <g transform="translate(0, 52)">
            <text fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Daily Habit Push Notifications</text>
            <!-- Toggle Active Switch -->
            <rect x="580" y="-12" width="84" height="32" rx="8" fill="#7C5CFF" />
            <text x="622" y="9" fill="#FFFFFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Enabled</text>
          </g>
        </g>
      </g>

      <!-- Panel 4: AI Model Integration -->
      <g transform="translate(0, 420)">
        <rect width="720" height="120" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <g transform="translate(28, 24)">
          <circle cx="16" cy="16" r="16" fill="#7C5CFF" fill-opacity="0.15" />
          <text x="16" y="21" fill="#8B6CFF" font-size="14" text-anchor="middle">⚡</text>

          <text x="44" y="14" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">AI Intelligence Provider</text>
          <text x="44" y="32" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12">Powered by Google Gemini (gemini-3.5-flash-lite) with OpenAI fallback.</text>

          <g transform="translate(0, 52)">
            <text fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">● Gemini Active (Primary) • Fallback: OpenAI</text>
            <rect x="580" y="-12" width="84" height="32" rx="8" fill="#171A21" stroke="#242832" stroke-width="1" />
            <text x="622" y="9" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Connected</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// Generate all 7 files
const files = [
  { name: '01_Design_System.svg', content: generateDesignSystemSvg() },
  { name: '02_Dashboard_Home.svg', content: generateDashboardSvg() },
  { name: '03_Profile_Career_Progress.svg', content: generateProfileSvg() },
  { name: '04_AI_Career_Assistant.svg', content: generateAIAssistantSvg() },
  { name: '05_Portfolio_Projects.svg', content: generateProjectsSvg() },
  { name: '06_Skills_Skill_Gap.svg', content: generateSkillGapSvg() },
  { name: '07_Platform_Settings.svg', content: generateSettingsSvg() },
];

for (const file of files) {
  const filePath = path.join(OUT_DIR, file.name);
  fs.writeFileSync(filePath, file.content, 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('All 7 Figma screens generated successfully!');
