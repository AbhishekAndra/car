const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Section 1 & 2: Maranello Atelier Gallery + Agreed Value Infographic
const atelierAndAgreedValueSection = `
  <!-- MARANELLO SUPERCAR ATELIER & FLEET SHOWCASE -->
  <section class="py-20 bg-[#070507] border-t border-red-950/70 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono mb-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>EXOTIC & SUPERCAR ATELIER</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white">THE MARANELLO ASSET PORTFOLIO</h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">Bespoke actuarial underwriting and white-glove telemetry engineered for Ferrari, McLaren, Lamborghini, and Porsche hypercars.</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="plans.html" class="px-5 py-2.5 rounded-full bg-black/60 border border-red-500/40 text-xs font-mono text-red-400 hover:text-white hover:border-red-400 transition-all">Compare All Tiers &rarr;</a>
          <a href="quote.html" class="btn-pill-red px-6 py-2.5 text-xs uppercase tracking-wider font-bold">CALCULATE QUOTE</a>
        </div>
      </div>

      <!-- 6-Card High-Resolution Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Card 1: Ferrari SF90 Stradale -->
        <div class="group rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)]">
          <div class="relative h-60 overflow-hidden bg-black">
            <img src="assets/images/ferrari-sf90.jpg" alt="Ferrari SF90 Stradale" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0809] via-transparent to-black/30"></div>
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-300 uppercase tracking-wider">
              1,000 HP HYBRID APEX
            </div>
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
              0-100: 2.5s
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span class="font-bold">AGREED IDV: $625,000</span>
              <span class="text-red-400 text-[11px] font-semibold">Zero Dep Carbon</span>
            </div>
          </div>
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="font-display font-extrabold text-white text-lg group-hover:text-red-400 transition-colors">Ferrari SF90 Stradale</h4>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Full protection for the 7.9 kWh high-voltage lithium battery, 3 electric motors, and carbon fiber active rear spoiler with zero market depreciation.
              </p>
            </div>
            <div class="pt-4 border-t border-red-950/80 flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">Underwriting: <strong class="text-red-400">Class AAA</strong></span>
              <a href="quote.html?brand=Ferrari&model=SF90" class="btn-pill-red px-4 py-1.5 text-[11px] uppercase tracking-wider font-bold">Quote SF90 &rarr;</a>
            </div>
          </div>
        </div>

        <!-- Card 2: Maranello Twin-Turbo V8 Engine -->
        <div class="group rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)]">
          <div class="relative h-60 overflow-hidden bg-black">
            <img src="assets/images/ferrari-engine.jpg" alt="Ferrari V8 Powertrain" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0809] via-transparent to-black/30"></div>
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-300 uppercase tracking-wider">
              POWERTRAIN INTEGRITY
            </div>
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
              3.9L BI-TURBO
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span class="font-bold">ENGINE COVER: 100%</span>
              <span class="text-red-400 text-[11px] font-semibold">Hydro-Lock Shield</span>
            </div>
          </div>
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="font-display font-extrabold text-white text-lg group-hover:text-red-400 transition-colors">V8 Twin-Turbo Powertrain Shield</h4>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Covers sudden hydrostatic lock, Inconel exhaust rupture, dual-clutch transmission stress, and ECU flash diagnostics with 100% Maranello factory parts.
              </p>
            </div>
            <div class="pt-4 border-t border-red-950/80 flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">Parts: <strong class="text-red-400">Genuine OEM</strong></span>
              <a href="plans.html" class="text-red-400 hover:text-red-300 font-mono text-xs flex items-center gap-1 font-bold">View Coverage &rarr;</a>
            </div>
          </div>
        </div>

        <!-- Card 3: Carbon Fiber & Alcantara Atelier Cockpit -->
        <div class="group rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)]">
          <div class="relative h-60 overflow-hidden bg-black">
            <img src="assets/images/ferrari-cockpit-carbon.jpg" alt="Carbon Supercar Cockpit" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0809] via-transparent to-black/30"></div>
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-300 uppercase tracking-wider">
              BESPOKE INTERIOR
            </div>
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
              CARBON ATELIER
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span class="font-bold">CABIN DEFENSE: $45,000</span>
              <span class="text-red-400 text-[11px] font-semibold">Key & HUD Shield</span>
            </div>
          </div>
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="font-display font-extrabold text-white text-lg group-hover:text-red-400 transition-colors">Carbon & Alcantara Interior Defense</h4>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Replacement of carbon fiber dashboard inlays, F1 shift-light steering wheel, head-up display units, and up to $4,500 smart key transponder replacement.
              </p>
            </div>
            <div class="pt-4 border-t border-red-950/80 flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">Deductible: <strong class="text-red-400">$0 Cashless</strong></span>
              <a href="quote.html" class="text-red-400 hover:text-red-300 font-mono text-xs flex items-center gap-1 font-bold">Add to Quote &rarr;</a>
            </div>
          </div>
        </div>

        <!-- Card 4: Circuit Track Day & Telemetry Shield -->
        <div class="group rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)]">
          <div class="relative h-60 overflow-hidden bg-black">
            <img src="assets/images/ferrari-track-racing.jpg" alt="Track Day Racing" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0809] via-transparent to-black/30"></div>
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-300 uppercase tracking-wider">
              CIRCUIT APEX
            </div>
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
              MONZA & FIORANO
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span class="font-bold">TRACK DAY: COVERED</span>
              <span class="text-red-400 text-[11px] font-semibold">Paddock Towing</span>
            </div>
          </div>
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="font-display font-extrabold text-white text-lg group-hover:text-red-400 transition-colors">Circuit Track Day & Telemetry Shield</h4>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Covers non-timed track day events at certified circuits. High-G collision monitoring, carbon-ceramic brake stress allowances, and circuit flatbed extraction.
              </p>
            </div>
            <div class="pt-4 border-t border-red-950/80 flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">Events: <strong class="text-red-400">FIA Approved Tracks</strong></span>
              <a href="services.html" class="text-red-400 hover:text-red-300 font-mono text-xs flex items-center gap-1 font-bold">Explore Track &rarr;</a>
            </div>
          </div>
        </div>

        <!-- Card 5: Certified Clean-Room OEM Atelier Workshop -->
        <div class="group rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)]">
          <div class="relative h-60 overflow-hidden bg-black">
            <img src="assets/images/supercar-workshop-bay.jpg" alt="Clean-Room Supercar Workshop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0809] via-transparent to-black/30"></div>
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-300 uppercase tracking-wider">
              CLEAN-ROOM OEM
            </div>
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
              FACTORY CERTIFIED
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span class="font-bold">10,800+ GARAGES</span>
              <span class="text-red-400 text-[11px] font-semibold">Cashless Settlement</span>
            </div>
          </div>
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="font-display font-extrabold text-white text-lg group-hover:text-red-400 transition-colors">Maranello-Certified Repair Facilities</h4>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Direct cashless settlement with certified technicians. Factory laser chassis alignment, original Rosso Corsa robotic paint matching, and lifetime warranty.
              </p>
            </div>
            <div class="pt-4 border-t border-red-950/80 flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">Warranty: <strong class="text-red-400">Lifetime Finish</strong></span>
              <a href="about.html" class="text-red-400 hover:text-red-300 font-mono text-xs flex items-center gap-1 font-bold">Network List &rarr;</a>
            </div>
          </div>
        </div>

        <!-- Card 6: Enclosed White-Glove Transporter -->
        <div class="group rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.25)]">
          <div class="relative h-60 overflow-hidden bg-black">
            <img src="assets/images/luxury-transporter.jpg" alt="Enclosed Supercar Transporter" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0809] via-transparent to-black/30"></div>
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-300 uppercase tracking-wider">
              ZERO-RAMP LOGISTICS
            </div>
            <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
              24/7 ENCLOSED
            </div>
            <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span class="font-bold">RESPONSE: 16 MIN</span>
              <span class="text-red-400 text-[11px] font-semibold">Zero Ground Scrapes</span>
            </div>
          </div>
          <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="font-display font-extrabold text-white text-lg group-hover:text-red-400 transition-colors">Hydraulic Enclosed Transporter Dispatch</h4>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Zero ramp-angle hydraulic lift beds prevent carbon splitter scraping. Climate-controlled, GPS live-tracked transport to your preferred certified dealership.
              </p>
            </div>
            <div class="pt-4 border-t border-red-950/80 flex items-center justify-between text-xs">
              <span class="font-mono text-slate-400">Hotline: <strong class="text-red-400">1-800-CALL-DRIVER</strong></span>
              <button class="trigger-sos-modal text-red-400 hover:text-red-300 font-mono text-xs flex items-center gap-1 font-bold">SOS Dispatch &rarr;</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- 100% AGREED VALUE IDV VS DEPRECIATED MARKET VALUE COMPARISON -->
  <section class="py-20 bg-[#050508] border-t border-red-950/70 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs uppercase font-mono tracking-[0.3em] text-red-400">ACTUARIAL SUPERIORITY</span>
        <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white">100% AGREED VALUE VS. TRADITIONAL DEPRECIATION</h2>
        <p class="text-xs sm:text-sm text-slate-300">Why standard commercial insurers fail exotic and high-performance supercar owners.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        <!-- Column 1: Traditional Insurers (Gray/Dim) -->
        <div class="p-8 rounded-3xl bg-[#09090d] border border-slate-800/80 flex flex-col justify-between relative opacity-85">
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">STANDARD MARKET MODEL</span>
                <h3 class="font-display text-xl font-bold text-slate-300">Traditional Auto Insurance</h3>
              </div>
              <span class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <i data-lucide="x-circle" class="w-5 h-5"></i>
              </span>
            </div>

            <ul class="space-y-4 text-xs text-slate-400">
              <li class="flex items-start gap-3">
                <i data-lucide="x" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-slate-200">Arbitrary Market Value Depreciation:</strong>
                  <p class="mt-0.5">Deducts 40% to 50% on carbon fiber bumpers, aerodynamic splitters, and electronic headlights.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="x" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-slate-200">Predatory Out-of-Pocket Deductibles:</strong>
                  <p class="mt-0.5">$2,500 to $5,000 deductibles forced on every supercar claim, eroding your financial defense.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="x" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-slate-200">Unapproved Third-Party Garages:</strong>
                  <p class="mt-0.5">Policies force repairs into generic uncertified bodyshops lacking Ferrari calibration rigs.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="x" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-slate-200">Track Days & Circuits Banned:</strong>
                  <p class="mt-0.5">Immediate policy cancellation if telemetry detects vehicle within 500m of a track paddock.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="x" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-slate-200">20-30 Day Surveyor Delays:</strong>
                  <p class="mt-0.5">Lengthy bureaucratic paper assessments while your prized vehicle sits in open transit lots.</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Result: Unprotected Investment</span>
            <span>Est. Claim Loss: -42%</span>
          </div>
        </div>

        <!-- Column 2: Stackly Ferrari Apex Shield (Rosso Corsa Glowing) -->
        <div class="p-8 rounded-3xl bg-gradient-to-b from-[#14080a] to-[#0a0507] border-2 border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.25)] flex flex-col justify-between relative">
          <div class="absolute -top-3 right-6 px-3 py-1 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.9)]">
            STACKLY MARANELLO PROTOCOL
          </div>

          <div class="space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-red-950">
              <div>
                <span class="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">GUARANTEED ASSET UNDERWRITING</span>
                <h3 class="font-display text-2xl font-extrabold text-white">Stackly Agreed Value Shield</h3>
              </div>
              <span class="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </span>
            </div>

            <ul class="space-y-4 text-xs text-slate-200">
              <li class="flex items-start gap-3">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-white">100% Fixed Agreed Value Guarantee:</strong>
                  <p class="text-slate-300 mt-0.5">We agree on your car's true replacement value at issuance. Zero market depreciation deducted on total loss or repair parts.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-white">Zero Depreciation on Carbon Fiber & Ceramics:</strong>
                  <p class="text-slate-300 mt-0.5">Full 100% reimbursement for carbon-fiber bodywork, Brembo carbon-ceramic discs, and titanium exhaust systems.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-white">100% Certified Maranello Workshop Network:</strong>
                  <p class="text-slate-300 mt-0.5">Direct cashless settlement exclusively with certified Ferrari atelier master technicians using genuine factory OEM parts.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-white">Circuit & Track Day Protection Rider:</strong>
                  <p class="text-slate-300 mt-0.5">Telemetry coverage for non-competitive track days, club sprints, and Fiorano / Monza track tours.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-white">30-Minute AI Computer Vision Settlement:</strong>
                  <p class="text-slate-300 mt-0.5">Instant smartphone damage scan and direct garage authorization in under 30 minutes. Drive away cashless.</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="pt-6 border-t border-red-950 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs font-mono">
              <span class="text-slate-400">Underwriting Solvency: </span>
              <strong class="text-red-400">2.45x Statutory Margin</strong>
            </div>
            <a href="quote.html" class="btn-pill-red px-6 py-2.5 text-xs uppercase tracking-wider font-bold shadow-lg">LOCK IN AGREED VALUE &rarr;</a>
          </div>
        </div>

      </div>

    </div>
  </section>
`;

// Insert Section 1 & 2 after The 4 Pillars section
const fourPillarsMarker = '<!-- EDITORIAL FEATURED FLEET & VEHICLE SHOWCASE -->';
if (html.includes(fourPillarsMarker)) {
  html = html.replace(fourPillarsMarker, atelierAndAgreedValueSection + '\n\n  ' + fourPillarsMarker);
  console.log('[Inserted] Atelier Gallery and Agreed Value sections');
} else {
  console.warn('[Marker Not Found] fourPillarsMarker');
}

// Section 3: Verified VIP Supercar Collector & Scuderia Endorsements
const endorsementsSection = `
  <!-- VERIFIED VIP SUPERCAR COLLECTOR & SCUDERIA ENDORSEMENTS -->
  <section class="py-20 bg-[#070507] border-t border-red-950/70 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div class="inline-flex items-center gap-1.5 text-red-500 font-mono text-xs">
          <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
          <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
          <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
          <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
          <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
          <span class="text-white font-bold ml-2">4.97 / 5.0 RATING (1,840,000+ SUPERCAR OWNERS)</span>
        </div>
        <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white">TRUSTED BY SCUDERIA COLLECTORS</h2>
        <p class="text-xs sm:text-sm text-slate-300">Hear from verified Ferrari owners who rely on Stackly's instant underwriting and white-glove mobility.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- VIP Endorsement 1: Alexander Wright -->
        <div class="p-6 rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div class="space-y-4">
            <div class="flex items-center gap-1 text-red-500">
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
            </div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "When an asphalt stone cracked my SF90 Stradale's carbon fiber front bumper and radar housing at 70 mph, Stackly approved a 100% OEM Maranello replacement in 24 minutes. Zero depreciation, zero headache."
            </p>
          </div>
          <div class="flex items-center gap-3.5 pt-5 border-t border-red-950/80 mt-5">
            <img src="assets/images/client-vip-1.jpg" alt="Alexander Wright" class="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-md">
            <div>
              <h5 class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Alexander Wright</span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">VIP PLATINUM</span>
              </h5>
              <p class="text-[10px] font-mono text-slate-400">2025 Ferrari SF90 Stradale &bull; Manhattan, NY</p>
              <p class="text-[9px] font-mono text-emerald-400 mt-0.5">Telematics Safe Score: 99/100</p>
            </div>
          </div>
        </div>

        <!-- VIP Endorsement 2: Elena Rostova -->
        <div class="p-6 rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div class="space-y-4">
            <div class="flex items-center gap-1 text-red-500">
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
            </div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "The Circuit Track Day rider gives me complete peace of mind at Circuit of the Americas and Laguna Seca. Their enclosed hydraulic tow truck arrived in 17 minutes when I had an oil line alarm. Unmatched service."
            </p>
          </div>
          <div class="flex items-center gap-3.5 pt-5 border-t border-red-950/80 mt-5">
            <img src="assets/images/client-vip-2.jpg" alt="Elena Rostova" class="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-md">
            <div>
              <h5 class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Elena Rostova</span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">SCUDERIA CLUB</span>
              </h5>
              <p class="text-[10px] font-mono text-slate-400">2024 Ferrari F8 Tributo &bull; Beverly Hills, CA</p>
              <p class="text-[9px] font-mono text-emerald-400 mt-0.5">Telematics Safe Score: 97/100</p>
            </div>
          </div>
        </div>

        <!-- VIP Endorsement 3: Marcus Vance -->
        <div class="p-6 rounded-3xl bg-[#0b0809] border border-red-950/80 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div class="space-y-4">
            <div class="flex items-center gap-1 text-red-500">
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
              <i data-lucide="star" class="w-4 h-4 fill-red-500"></i>
            </div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "Transferring my 50% No Claim Bonus took 45 seconds on their web calculator. Stackly locked in my Agreed Value IDV for the 296 GTB without asking for absurd paper surveys. Highly recommended."
            </p>
          </div>
          <div class="flex items-center gap-3.5 pt-5 border-t border-red-950/80 mt-5">
            <img src="assets/images/client-vip-3.jpg" alt="Marcus Vance" class="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-md">
            <div>
              <h5 class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Marcus Vance</span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">TELEMATICS PRO</span>
              </h5>
              <p class="text-[10px] font-mono text-slate-400">2025 Ferrari 296 GTB &bull; Austin, TX</p>
              <p class="text-[9px] font-mono text-emerald-400 mt-0.5">Telematics Safe Score: 98/100</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
`;

// Replace older testimonial section with new VIP Supercar Endorsements
const oldTestimonialRegex = /<!--\s*TESTIMONIALS & DRIVER REPUTATION[\s\S]*?<\/section>/i;
if (oldTestimonialRegex.test(html)) {
  html = html.replace(oldTestimonialRegex, endorsementsSection);
  console.log('[Replaced] Testimonials with VIP Supercar Endorsements');
} else {
  console.warn('[Not Found] oldTestimonialRegex');
}

// Section 4: Supercar Underwriting & Mobility FAQ Accordion
const faqSection = `
  <!-- SUPERCAR UNDERWRITING & MOBILITY FAQ ACCORDION -->
  <section class="py-20 bg-[#050508] border-t border-red-950/70 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-12 space-y-2">
        <span class="text-xs uppercase font-mono tracking-[0.3em] text-red-400">CLARITY & PRECISION</span>
        <h2 class="font-display text-3xl font-extrabold text-white">FREQUENTLY ASKED QUESTIONS</h2>
        <p class="text-xs sm:text-sm text-slate-400">Everything you need to know about our Agreed Value underwriting and Ferrari roadside support.</p>
      </div>

      <div class="space-y-4">
        
        <!-- Q1 -->
        <div class="rounded-2xl bg-[#0b0809] border border-red-950/80 overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-red-950/20 transition-colors">
            <span class="font-display font-bold text-white text-sm sm:text-base">What is 100% Agreed Value IDV and how is my Ferrari evaluated?</span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-red-400 transition-transform duration-300"></i>
          </button>
          <div class="px-5 pb-5 text-xs text-slate-300 leading-relaxed hidden">
            Unlike traditional insurers that apply standard age-based market depreciation charts (which drastically undervalue supercars), Stackly agrees upon a fixed Insured Declared Value (IDV) at policy inception based on authentic valuation, options, and market rarity. In the event of a constructive total loss, you are compensated for 100% of that agreed sum without dispute.
          </div>
        </div>

        <!-- Q2 -->
        <div class="rounded-2xl bg-[#0b0809] border border-red-950/80 overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-red-950/20 transition-colors">
            <span class="font-display font-bold text-white text-sm sm:text-base">Are non-competitive track day events and circuit driving covered?</span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-red-400 transition-transform duration-300"></i>
          </button>
          <div class="px-5 pb-5 text-xs text-slate-300 leading-relaxed hidden">
            Yes! With our optional Maranello Circuit Shield rider, your Ferrari is protected during FIA-sanctioned non-timed track days, car club driver training, and circuit events at venues like Monza, Fiorano, Circuit of the Americas, and Laguna Seca. High-G impact detection, paddock extraction, and enclosed transport are fully included.
          </div>
        </div>

        <!-- Q3 -->
        <div class="rounded-2xl bg-[#0b0809] border border-red-950/80 overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-red-950/20 transition-colors">
            <span class="font-display font-bold text-white text-sm sm:text-base">Does Stackly guarantee 100% genuine OEM Ferrari Maranello parts?</span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-red-400 transition-transform duration-300"></i>
          </button>
          <div class="px-5 pb-5 text-xs text-slate-300 leading-relaxed hidden">
            Strictly and without exception. We never authorize aftermarket or salvage parts. All replacement parts—from carbon fiber splitters and Brembo ceramic brake rotors to hybrid battery modules and wiring looms—are sourced directly from authorized Maranello factory inventories and installed by certified master technicians.
          </div>
        </div>

        <!-- Q4 -->
        <div class="rounded-2xl bg-[#0b0809] border border-red-950/80 overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-red-950/20 transition-colors">
            <span class="font-display font-bold text-white text-sm sm:text-base">How does the 24/7 Enclosed Hydraulic Flatbed Roadside Towing work?</span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-red-400 transition-transform duration-300"></i>
          </button>
          <div class="px-5 pb-5 text-xs text-slate-300 leading-relaxed hidden">
            Supercars with ultra-low ground clearance cannot be towed on ordinary angled tow trucks without destroying the front carbon splitter. Our emergency dispatch deploys 100% flatbed transporters with hydraulic zero-degree bed drop, ensuring your car is loaded parallel to the asphalt without ground contact. Average arrival time is under 18 minutes.
          </div>
        </div>

        <!-- Q5 -->
        <div class="rounded-2xl bg-[#0b0809] border border-red-950/80 overflow-hidden">
          <button onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-red-950/20 transition-colors">
            <span class="font-display font-bold text-white text-sm sm:text-base">Can I retain my 50% No Claim Bonus (NCB) when switching to Stackly?</span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-red-400 transition-transform duration-300"></i>
          </button>
          <div class="px-5 pb-5 text-xs text-slate-300 leading-relaxed hidden">
            Absolutely. You can transfer up to 50% NCB from your existing auto insurer in seconds. Our digital registration lookup automatically verifies your claim history, applying the full discount directly to your initial premium quote with our NCB Retention Guarantee rider.
          </div>
        </div>

      </div>

    </div>
  </section>
`;

// Insert FAQ section right before CTA Banner
const ctaBannerMarker = '<!-- CTA BANNER (BLACK & RED FERRARI MOBILITY SUITE) -->';
if (html.includes(ctaBannerMarker)) {
  html = html.replace(ctaBannerMarker, faqSection + '\n\n  ' + ctaBannerMarker);
  console.log('[Inserted] FAQ Accordion Section');
} else {
  console.warn('[Marker Not Found] ctaBannerMarker');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Rich content insertion into index.html complete!');

