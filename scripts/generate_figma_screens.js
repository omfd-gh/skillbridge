import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('figma');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Common Shared SVG Defs (Gradients, Filters, Shadows)
const SHARED_DEFS = `
  <defs>
    <!-- Ambient Glow Gradients -->
    <radialGradient id="purpleGlowTop" cx="60%" cy="0%" r="65%">
      <stop offset="0%" stop-color="#7C5CFF" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#07080B" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="sidebarGlow" cx="20%" cy="0%" r="65%">
      <stop offset="0%" stop-color="#7C5CFF" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#090A0D" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="cardHeroGlow" cx="90%" cy="10%" r="70%">
      <stop offset="0%" stop-color="#7C5CFF" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#101217" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="geminiAIGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8B6CFF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#7C5CFF" stop-opacity="0" />
    </radialGradient>

    <!-- Linear Accent Gradients -->
    <linearGradient id="primaryPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B6CFF" />
      <stop offset="100%" stop-color="#7C5CFF" />
    </linearGradient>
    <linearGradient id="readinessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C5CFF" />
      <stop offset="100%" stop-color="#27D6A0" />
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#27D6A0" />
      <stop offset="100%" stop-color="#35D39A" />
    </linearGradient>
    <linearGradient id="activeNavPill" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8B6CFF" />
      <stop offset="100%" stop-color="#7C5CFF" />
    </linearGradient>

    <!-- Filters / Shadows -->
    <filter id="dropShadowCard" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="15" flood-color="#000000" flood-opacity="0.35" />
    </filter>
    <filter id="purpleGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
`;

// Helper: Common Sidebar SVG Generator
function renderSidebar(activeRoute = '/dashboard') {
  const navItems = [
    { id: '/dashboard', label: 'Dashboard', icon: 'M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z' },
    { id: '/roadmap', label: 'Roadmap', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', badge: 'Active' },
    { id: '/skill-gap', label: 'Skill Gap', icon: 'M4 6h16M4 12h16M4 18h16' },
    { id: '/projects', label: 'Projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', count: '1/4' },
    { id: '/ai', label: 'AI Assistant', icon: 'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z', highlight: true },
    { id: '/profile', label: 'Profile & Progress', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: '/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  let navItemsSvg = '';
  let yPos = 130;

  navItems.forEach((item) => {
    const isActive = activeRoute === item.id;
    const itemBg = isActive ? '#13151B' : 'transparent';
    const borderStroke = isActive ? '#242832' : 'transparent';
    const textColor = isActive ? '#F2F3F5' : item.highlight ? '#8B6CFF' : '#949BAD';
    const iconColor = isActive ? '#F2F3F5' : item.highlight ? '#8B6CFF' : '#687083';

    navItemsSvg += `
      <g id="Nav_${item.label.replace(/\\s+/g, '_')}" transform="translate(16, ${yPos})">
        <rect width="224" height="42" rx="8" fill="${itemBg}" stroke="${borderStroke}" stroke-width="1" />
        ${isActive ? '<rect x="219" y="14" width="3" height="14" rx="1.5" fill="url(#activeNavPill)" />' : ''}
        <path d="${item.icon}" fill="none" stroke="${iconColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" transform="translate(14, 12) scale(0.75)" />
        <text x="42" y="25" fill="${textColor}" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="13" font-weight="${isActive ? '600' : '500'}">${item.label}</text>
        ${item.badge ? `
          <rect x="160" y="11" width="44" height="20" rx="10" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
          <text x="182" y="24" fill="#8B6CFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" text-anchor="middle">${item.badge}</text>
        ` : ''}
        ${item.count ? `
          <rect x="175" y="12" width="28" height="18" rx="4" fill="#0A0B0F" />
          <text x="189" y="24" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="600" text-anchor="middle">${item.count}</text>
        ` : ''}
      </g>
    `;
    yPos += 48;
  });

  return `
    <!-- Sidebar Frame (256px wide, 1024px high) -->
    <g id="Sidebar" transform="translate(0, 0)">
      <rect width="256" height="1024" fill="#090A0D" stroke="#1B1E25" stroke-width="1" />
      <rect width="256" height="320" fill="url(#sidebarGlow)" />

      <!-- Brand Logo Header -->
      <g id="Brand_Header" transform="translate(20, 24)">
        <rect width="38" height="38" rx="10" fill="url(#primaryPurpleGrad)" />
        <!-- Compass Icon -->
        <circle cx="19" cy="19" r="10" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
        <polygon points="19,12 22,19 19,26 16,19" fill="#FFFFFF" />
        <text x="50" y="20" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="16" font-weight="800">Skill<tspan fill="#8B6CFF">Bridge</tspan></text>
        <rect x="140" y="9" width="46" height="18" rx="4" fill="#7C5CFF" fill-opacity="0.15" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
        <text x="163" y="21" fill="#A38BFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="9" font-weight="700" text-anchor="middle">AI MVP</text>
        <text x="50" y="34" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="500">Data Analyst</text>
      </g>

      <line x1="0" y1="84" x2="256" y2="84" stroke="#1B1E25" stroke-width="1" />

      <!-- Section Label -->
      <text x="24" y="112" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="0.08em">PLATFORM</text>

      <!-- Nav Items -->
      ${navItemsSvg}

      <!-- Bottom Info & User Card -->
      <g id="Sidebar_Footer" transform="translate(16, 880)">
        <!-- Streak Card -->
        <rect width="224" height="48" rx="8" fill="#101217" stroke="#1B1E25" stroke-width="1" />
        <rect x="10" y="10" width="28" height="28" rx="6" fill="#EAB04B" fill-opacity="0.15" />
        <text x="24" y="28" fill="#EAB04B" font-size="14" text-anchor="middle">🔥</text>
        <text x="46" y="24" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700">8-Day Streak</text>
        <text x="46" y="36" fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10">Keep learning today</text>

        <!-- User Profile Card -->
        <g transform="translate(0, 56)">
          <rect width="224" height="48" rx="8" fill="#101217" stroke="#1B1E25" stroke-width="1" />
          <circle cx="24" cy="24" r="14" fill="#7C5CFF" fill-opacity="0.2" stroke="#7C5CFF" stroke-width="1" />
          <text x="24" y="28" fill="#A38BFF" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">A</text>
          <text x="46" y="22" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="700">Aarav</text>
          <text x="46" y="35" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="10" font-weight="600">● 48% Readiness</text>
        </g>
      </g>
    </g>
  `;
}

// Helper: Common Top Header SVG Generator
function renderTopHeader(pageTitle = 'Overview') {
  return `
    <g id="TopHeader" transform="translate(256, 0)">
      <rect width="1184" height="64" fill="#07080B" fill-opacity="0.9" stroke="#1B1E25" stroke-width="1" />
      
      <!-- Breadcrumb -->
      <g transform="translate(32, 24)">
        <text fill="#687083" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="500">SkillBridge / </text>
        <text x="75" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="14" font-weight="700">${pageTitle}</text>
      </g>

      <!-- Target Role Pill (Center) -->
      <g transform="translate(480, 16)">
        <rect width="340" height="32" rx="16" fill="#101217" stroke="#242832" stroke-width="1" />
        <!-- Target Icon -->
        <circle cx="20" cy="16" r="6" fill="none" stroke="#8B6CFF" stroke-width="1.5" />
        <circle cx="20" cy="16" r="2" fill="#8B6CFF" />
        <text x="32" y="20" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Target:</text>
        <text x="72" y="20" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="700">Data Analyst</text>
        <line x1="145" y1="10" x2="145" y2="22" stroke="#242832" stroke-width="1" />
        <text x="156" y="20" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">🕒 4-6 hrs/wk</text>
        <line x1="235" y1="10" x2="235" y2="22" stroke="#242832" stroke-width="1" />
        <text x="246" y="20" fill="#949BAD" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11">Readiness:</text>
        <text x="306" y="20" fill="#27D6A0" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="11" font-weight="800">48%</text>
      </g>

      <!-- Right Actions -->
      <g transform="translate(1020, 16)">
        <!-- Ask AI Button -->
        <rect width="84" height="32" rx="8" fill="#13151B" stroke="#7C5CFF" stroke-opacity="0.3" stroke-width="1" />
        <text x="18" y="20" fill="#8B6CFF" font-size="12">✨</text>
        <text x="34" y="20" fill="#F2F3F5" font-family="Plus Jakarta Sans, Inter, sans-serif" font-size="12" font-weight="600">Ask AI</text>
        
        <!-- Bell Icon -->
        <g transform="translate(98, 0)">
          <rect width="32" height="32" rx="8" fill="#101217" stroke="#242832" stroke-width="1" />
          <path d="M16 6a4 4 0 00-4 4v2c0 .6-.4 1.4-.9 1.8L9.5 15h13l-1.6-1.2c-.5-.4-.9-1.2-.9-1.8v-2a4 4 0 00-4-4zM14 18a2 2 0 004 0" fill="none" stroke="#949BAD" stroke-width="1.5" />
          <circle cx="22" cy="8" r="3" fill="#8B6CFF" />
        </g>
      </g>
    </g>
  `;
}

console.log('Building SVG screens...');
export { renderSidebar, renderTopHeader, SHARED_DEFS, OUT_DIR };
