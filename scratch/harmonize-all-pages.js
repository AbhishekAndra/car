const fs = require('fs');

const pages = [
  'about.html',
  'services.html',
  'plans.html',
  'quote.html',
  'claims.html',
  'contact.html',
  'dashboard.html'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Convert cyan and outdated brand tokens
  html = html.replace(/selection:bg-cyan-400 selection:text-slate-950/g, 'selection:bg-red-500 selection:text-white');
  html = html.replace(/hover:text-cyan-400/g, 'hover:text-red-400');
  html = html.replace(/hover:text-cyan-300/g, 'hover:text-red-300');
  html = html.replace(/text-cyan-400/g, 'text-red-400');
  html = html.replace(/text-cyan-300/g, 'text-red-300');
  html = html.replace(/border-cyan-500\/40/g, 'border-red-500/40');
  html = html.replace(/border-cyan-500\/30/g, 'border-red-500/40');
  html = html.replace(/border-cyan-500\/50/g, 'border-red-500/50');
  html = html.replace(/border-cyan-500/g, 'border-red-500');
  html = html.replace(/border-cyan-400/g, 'border-red-400');
  html = html.replace(/bg-cyan-950\/80/g, 'bg-red-950/80');
  html = html.replace(/bg-cyan-950\/70/g, 'bg-red-950/70');
  html = html.replace(/bg-cyan-950/g, 'bg-red-950');
  html = html.replace(/btn-cyan-glow/g, 'btn-pill-red');
  html = html.replace(/VANGUARD AUTO MOTOR ASSURE/g, 'STACKLY MOTOR & MOBILITY ASSURE');
  html = html.replace(/VANGUARD AUTO/g, 'STACKLY MOTOR');

  // Ensure footers use logo.png
  html = html.replace(/src="assets\/images\/logo-icon\.svg"/g, 'src="assets/images/logo-icon.png"');

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[Harmonized Red Theme] ${file}`);
});

