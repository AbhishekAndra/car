const fs = require('fs');
const path = require('path');

// Standardized nav links definition
const NAV_CONFIG = [
  { id: 'home', title: 'HOME', href: 'index.html' },
  { id: 'about', title: 'ABOUT US', href: 'about.html' },
  { id: 'services', title: 'SERVICES', href: 'services.html' },
  { id: 'plans', title: 'PLANS & QUOTE', href: 'plans.html' },
  { id: 'claims', title: 'EXPRESS CLAIMS', href: 'claims.html' },
  { id: 'contact', title: 'CONTACT', href: 'contact.html' },
  { id: 'portal', title: 'PORTAL', href: 'dashboard.html', isSpecial: true }
];

function generateHeader(activeId) {
  const desktopLinks = NAV_CONFIG.map(link => {
    const isActive = link.id === activeId;
    let classes = 'nav-link-callmy';
    if (isActive) classes += ' active';
    if (link.isSpecial) {
      classes += ' text-red-400 hover:text-red-300 font-bold';
    } else if (!isActive) {
      classes += ' text-slate-300 hover:text-white';
    }
    return `<a href="${link.href}" class="${classes}">${link.title}</a>`;
  }).join('\n        ');

  return `<!-- MAIN NAVIGATION HEADER (SLEEK BLACK & PURE FERRARI RED THEME) -->
  <header class="sticky top-0 z-40 bg-[#050508]/95 backdrop-blur-xl border-b border-red-950/40 transition-all duration-300" id="main-header">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      
      <!-- Brand Logo (Pure Red Stackly Logo) -->
      <a href="index.html" class="flex items-center gap-3 shrink-0 group py-1">
        <img src="assets/images/logo.png" alt="Stackly" class="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_16px_rgba(239,68,68,0.45)]">
      </a>

      <!-- Desktop Nav matching reference mockup -->
      <nav class="hidden lg:flex items-center gap-7 xl:gap-9 text-xs font-bold uppercase tracking-wider text-slate-300">
        ${desktopLinks}
      </nav>

      <!-- Right Header Actions (GET STARTED red pill button + Sign In / User Profile) -->
      <div class="hidden sm:flex items-center gap-3 header-auth-actions">
        <a href="login.html" class="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white px-2">Sign In</a>
        <a href="quote.html" class="btn-pill-red px-6 py-2.5 text-xs uppercase tracking-wider font-bold">GET STARTED</a>
      </div>

      <!-- Mobile Hamburger Button -->
      <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl bg-slate-900 border border-red-900/40 text-slate-300 hover:text-white hover:border-red-500 transition-colors">
        <i data-lucide="menu" class="w-5 h-5"></i>
      </button>
    </div>
  </header>`;
}

function generateMobileDrawer(activeId) {
  const drawerLinks = [
    { id: 'home', title: 'HOME', href: 'index.html' },
    { id: 'about', title: 'ABOUT US', href: 'about.html' },
    { id: 'services', title: 'SERVICES', href: 'services.html' },
    { id: 'plans', title: 'COVERAGE & PLANS', href: 'plans.html' },
    { id: 'quote', title: 'PREMIUM CALCULATOR', href: 'quote.html' },
    { id: 'claims', title: 'EXPRESS CLAIMS', href: 'claims.html' },
    { id: 'contact', title: 'CONTACT & SOS', href: 'contact.html' },
    { id: 'portal', title: 'POLICYHOLDER PORTAL', href: 'dashboard.html', isSpecial: true }
  ].map(link => {
    const isActive = link.id === activeId;
    let classes = 'py-1.5 transition-colors';
    if (isActive) {
      classes += ' text-red-500 font-bold border-l-2 border-red-500 pl-2';
    } else if (link.isSpecial) {
      classes += ' text-red-400 hover:text-red-300 font-bold';
    } else {
      classes += ' text-slate-300 hover:text-red-400';
    }
    return `<a href="${link.href}" class="${classes}">${link.title}</a>`;
  }).join('\n        ');

  return `<!-- MOBILE NAVIGATION DRAWER -->
  <div id="mobile-menu-drawer" class="fixed inset-y-0 right-0 z-50 w-72 bg-[#080506]/98 backdrop-blur-2xl border-l border-red-900/50 p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300 lg:hidden shadow-2xl">
    <div>
      <div class="flex items-center justify-between pb-6 border-b border-red-950/60">
        <a href="index.html" class="flex items-center gap-2">
          <img src="assets/images/logo.png" alt="Stackly" class="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_2px_12px_rgba(239,68,68,0.4)]">
        </a>
        <button id="mobile-menu-close" class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <nav class="flex flex-col gap-3.5 mt-6 text-sm font-semibold tracking-wide text-slate-300">
        ${drawerLinks}
      </nav>
    </div>

    <div class="pt-6 border-t border-red-950/60 space-y-3">
      <a href="login.html" class="block w-full py-2.5 text-center rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:border-red-500/50 transition-colors">Sign In</a>
      <a href="quote.html" class="block w-full py-2.5 text-center btn-pill-red text-xs uppercase tracking-wider font-bold">GET STARTED</a>
    </div>
  </div>`;
}

// Pages to update with their respective active nav item
const targetPages = {
  'index.html': 'home',
  'about.html': 'about',
  'services.html': 'services',
  'plans.html': 'plans',
  'quote.html': 'plans',
  'claims.html': 'claims',
  'contact.html': 'contact',
  'dashboard.html': 'portal'
};

Object.entries(targetPages).forEach(([file, activeId]) => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace Header
  const headerRegex = /<!--\s*MAIN NAVIGATION HEADER[\s\S]*?<\/header>|<header class="sticky top-0[\s\S]*?<\/header>/i;
  if (headerRegex.test(html)) {
    html = html.replace(headerRegex, generateHeader(activeId));
    console.log(`[Header Updated] ${file} -> activeId: ${activeId}`);
  } else {
    console.warn(`[Header NOT Found] ${file}`);
  }

  // Replace or Insert Mobile Drawer
  const drawerRegex = /<!--\s*MOBILE NAVIGATION DRAWER[\s\S]*?<\/div>\s*<\/div>/i;
  if (drawerRegex.test(html)) {
    html = html.replace(drawerRegex, generateMobileDrawer(activeId));
    console.log(`[Drawer Replaced] ${file}`);
  } else {
    // Insert right after </header>
    const headerEndPos = html.indexOf('</header>');
    if (headerEndPos !== -1) {
      const insertIdx = headerEndPos + '</header>'.length;
      html = html.slice(0, insertIdx) + '\n\n  ' + generateMobileDrawer(activeId) + html.slice(insertIdx);
      console.log(`[Drawer Inserted] ${file}`);
    } else {
      console.warn(`[Drawer Insert Failed] ${file}`);
    }
  }

  // Ensure selection colors and pure red logo in headers
  html = html.replace(/selection:bg-cyan-400 selection:text-slate-950/g, 'selection:bg-red-500 selection:text-white');

  fs.writeFileSync(file, html, 'utf8');
});

console.log('Phase 1 navbar standardization complete!');

