const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Preloader to pure red Stackly
html = html.replace(
  /<div id="luxury-preloader">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i,
  `<!-- LUXURY EDITORIAL PRELOADER -->
  <div id="luxury-preloader" class="bg-[#050508]">
    <div class="flex flex-col items-center text-center px-6">
      <div class="relative mb-5">
        <div class="w-16 h-16 rounded-2xl bg-black border border-red-500/50 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(239,68,68,0.45)] animate-pulse">
          <img src="assets/images/logo-icon.png" alt="Stackly Icon" class="w-full h-full object-contain">
        </div>
        <div class="absolute -inset-1 rounded-2xl bg-red-500/25 blur-lg pointer-events-none"></div>
      </div>
      <span class="text-[10px] uppercase font-mono tracking-[0.35em] text-red-400 mb-2">AUTONOMOUS SUPERCAR UNDERWRITING PROTOCOL</span>
      <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-wider">STACKLY MOTOR</h2>
      <p class="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-mono mt-1">EXOTIC VEHICLE MOBILITY & MARANELLO CLAIM SHIELD</p>
      <div class="preloader-line bg-red-950/50">
        <div id="preloader-progress" class="preloader-progress"></div>
      </div>
      <div class="mt-4 font-mono text-xs text-slate-400">
        <span id="preloader-count">0</span>% INITIALIZING FERRARI TELEMETRY
      </div>
    </div>
  </div>`
);

// 2. Update Category Selector to Black & Red
html = html.replace(
  /<section class="py-10 bg-\[#0a101f\] border-y border-slate-800">/i,
  `<section class="py-12 bg-[#060405] border-y border-red-950/70">`
);
html = html.replace(
  /<span class="text-\[10px\] uppercase font-mono tracking-\[0\.25em\] text-cyan-400">SELECT YOUR ASSET TYPE<\/span>/i,
  `<span class="text-[10px] uppercase font-mono tracking-[0.25em] text-red-400">SELECT YOUR ASSET TYPE</span>`
);

// 3. Update The 4 Pillars section to Black & Red
html = html.replace(
  /<span class="text-xs uppercase font-mono tracking-\[0\.3em\] text-cyan-400">ENGINEERED FOR ABSOLUTE CERTAINTY<\/span>/i,
  `<span class="text-xs uppercase font-mono tracking-[0.3em] text-red-400">ENGINEERED FOR ABSOLUTE CERTAINTY</span>`
);
html = html.replace(
  /THE FOUR PILLARS OF MODERN MOBILITY DEFENSE/i,
  `THE FOUR PILLARS OF SUPERCAR MOBILITY DEFENSE`
);
html = html.replace(
  /Traditional insurers bury policyholders in delays and depreciations\. Vanguard replaces archaic friction with instant digital settlement\./i,
  `Traditional insurers bury exotic owners in delays and 50% depreciations. Stackly delivers 100% Agreed Value with instant cashless authorization.`
);

// Card 1 in 4 pillars
html = html.replace(
  /<div class="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500\/40 flex items-center justify-center text-cyan-400">/i,
  `<div class="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">`
);
html = html.replace(
  /<div class="pt-6 border-t border-slate-800\/80 mt-6 flex items-center justify-between text-\[11px\] font-mono text-cyan-400">/i,
  `<div class="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-red-400">`
);

// Card 2 in 4 pillars
html = html.replace(
  /<div class="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500\/40 flex items-center justify-center text-blue-400">/i,
  `<div class="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">`
);
html = html.replace(
  /<div class="pt-6 border-t border-slate-800\/80 mt-6 flex items-center justify-between text-\[11px\] font-mono text-blue-400">/i,
  `<div class="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-red-400">`
);

// Card 3 in 4 pillars
html = html.replace(
  /<div class="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500\/40 flex items-center justify-center text-emerald-400">/i,
  `<div class="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">`
);
html = html.replace(
  /<div class="pt-6 border-t border-slate-800\/80 mt-6 flex items-center justify-between text-\[11px\] font-mono text-emerald-400">/i,
  `<div class="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-red-400">`
);

// Card 4 in 4 pillars
html = html.replace(
  /<div class="w-12 h-12 rounded-xl bg-red-950 border border-red-500\/40 flex items-center justify-center text-red-400">/i,
  `<div class="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">`
);

// 4. Update Featured Fleet & Vehicle Showcase
html = html.replace(
  /<span class="text-xs uppercase font-mono tracking-\[0\.3em\] text-cyan-400">SIGNATURE MOTOR PORTFOLIO<\/span>/i,
  `<span class="text-xs uppercase font-mono tracking-[0.3em] text-red-400">SIGNATURE MOTOR PORTFOLIO</span>`
);
html = html.replace(
  /btn-cyan-glow/g,
  'btn-pill-red'
);

// 5. Update Add-ons & Claims Ticker
html = html.replace(
  /<span class="text-xs uppercase font-mono tracking-\[0\.3em\] text-cyan-400">MODULAR RIDERS & ENDORSEMENTS<\/span>/i,
  `<span class="text-xs uppercase font-mono tracking-[0.3em] text-red-400">MODULAR RIDERS & ENDORSEMENTS</span>`
);
html = html.replace(
  /<span class="text-xs uppercase font-mono tracking-\[0\.3em\] text-cyan-400">TRANSPARENT CLAIMS LIFECYCLE<\/span>/i,
  `<span class="text-xs uppercase font-mono tracking-[0.3em] text-red-400">TRANSPARENT CLAIMS LIFECYCLE</span>`
);
html = html.replace(
  /border-cyan-500\/30/g,
  'border-red-500/40'
);
html = html.replace(
  /CLM-84920 \(Porsche Taycan 4S\)/g,
  'CLM-99201 (Ferrari SF90 Stradale)'
);
html = html.replace(
  /\$4,850<\/strong>/g,
  '$24,800</strong>'
);
html = html.replace(
  /Body Painting & Final Inspection/g,
  'Maranello OEM Aero Splitter & Sensor Assembly'
);
html = html.replace(
  /text-cyan-400 hover:underline/g,
  'text-red-400 hover:text-red-300 hover:underline'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Harmonized existing sections in index.html');

