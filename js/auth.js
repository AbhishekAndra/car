/**
 * Vanguard Motor Assure - Auth & User Session Manager
 * Includes Glassmorphic Login Modal, Dynamic Header Sync, and 1-Click VIP Personas
 */

const DEMO_PERSONAS = [
  {
    name: 'Alexander Wright',
    email: 'alexander.wright@ferrari-vip.io',
    phone: '+1 (555) 382-9011',
    role: 'Scuderia VIP Platinum Member',
    vehicle: '2025 Ferrari SF90 Stradale (Assetto Fiorano)',
    image: 'assets/images/ferrari-sf90.webp',
    regNo: 'FER-SF90-01',
    policyNo: 'FR-SF90-99201',
    plan: 'Rosso Corsa Zero-Depreciation & Hybrid Shield',
    idv: '$585,000',
    expiry: 'Nov 18, 2027',
    driverScore: 99,
    safeDiscount: '32% ($1,840)',
    validDays: '385 Days',
    avatar: 'AW',
    addons: [
      { icon: 'shield-check', title: 'Zero Depreciation Apex', desc: '100% parts & Maranello carbon reimbursement' },
      { icon: 'zap', title: 'Hybrid V8 PHEV Battery Shield', desc: 'High-voltage cell immersion & wallbox surge cover' },
      { icon: 'disc', title: 'Brembo Carbon-Ceramic Shield', desc: 'Brake rotor wear & track disc replacement' },
      { icon: 'truck', title: '24/7 Enclosed Hydraulic Flatbed', desc: 'Unlimited priority roadside recovery & transport' }
    ],
    claims: [
      { id: 'CLM-90210', stage: 'CLAIM SETTLED: CASHLESS', workshop: 'Maranello Official Service Bay', estReady: 'Settled Aug 14, 2026', amount: '$12,400', isSettled: true }
    ]
  },
  {
    name: 'Elena Rostova',
    email: 'elena.rostova@velocity-scuderia.com',
    phone: '+1 (555) 749-1823',
    role: 'Ferrari Track Day Club Member',
    vehicle: '2024 Ferrari 488 Pista (Rosso Corsa Special Series)',
    image: 'assets/images/ferrari-pista.webp',
    regNo: 'FER-F8-7701',
    policyNo: 'FR-F8-84112',
    plan: 'Maranello Performance Gold + Track Day Shield',
    idv: '$340,000',
    expiry: 'Aug 24, 2027',
    driverScore: 95,
    safeDiscount: '25% ($980)',
    validDays: '298 Days',
    avatar: 'ER',
    addons: [
      { icon: 'flag', title: 'Circuit Paddock Liability', desc: 'FIA grade track liability & paddock crash indemnity' },
      { icon: 'flame', title: 'Inconel Exhaust & Turbo Cover', desc: 'High-heat thermal stress & manifold protection' },
      { icon: 'circle-dot', title: 'Michelin Cup 2 R Track Tire Cover', desc: 'Puncture & high-speed delamination replacement' },
      { icon: 'truck', title: '24/7 Circuit Breakdown Dispatch', desc: 'Emergency towing from any authorized racetrack' }
    ],
    claims: [
      { id: 'CLM-84920', stage: 'STAGE 4: REPAIRS ACTIVE', workshop: 'Apex Prestige Maranello Autobody', estReady: 'Est. Ready: Nov 12, 2026', amount: '$4,850', isSettled: false }
    ]
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.vance@techfrontier.ai',
    phone: '+1 (555) 902-3344',
    role: 'Smart Supercar Telematics Member',
    vehicle: '2025 Ferrari Roma GT Solaire (Grand Tourer)',
    image: 'assets/images/ferrari-roma-sunset.webp',
    regNo: 'FER-296-4040',
    policyNo: 'FR-296-55102',
    plan: 'Pay-As-You-Drive Supercar Telematics (10,000 KM)',
    idv: '$325,000',
    expiry: 'Dec 05, 2027',
    driverScore: 98,
    safeDiscount: '28% ($1,150)',
    validDays: '402 Days',
    avatar: 'MV',
    addons: [
      { icon: 'cpu', title: 'CAN-Bus Telematics IoT Link', desc: 'Real-time G-force & automated accident SOS' },
      { icon: 'user-check', title: 'Dedicated Chauffeur Valet Pass', desc: 'Door-to-door verified chauffeur pickup 24/7' },
      { icon: 'shield-alert', title: 'Natural Disaster & Flood Cover', desc: 'Comprehensive hail, storm & hydro-lock rebuilding' },
      { icon: 'life-buoy', title: 'Nationwide Roadside Assistance', desc: 'Flat tire, battery boost & zero-delay fuel delivery' }
    ],
    claims: [
      { id: 'CLM-78104', stage: 'CLAIM SETTLED: CASHLESS', workshop: 'Maranello GT Center', estReady: 'Settled Jun 19, 2026', amount: '$2,150', isSettled: true }
    ]
  }
];

class AuthManager {
  constructor() {
    this.storageKey = 'vanguard_auth_user';
    this.currentUser = this.loadUser();
    this.init();
  }

  loadUser() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not parse user from storage', e);
    }
    // Only default to demo persona on dashboard.html if accessed directly
    const isDashboard = window.location.pathname.endsWith('dashboard.html') || window.location.pathname.endsWith('dashboard');
    if (isDashboard) {
      return DEMO_PERSONAS[0];
    }
    return null;
  }

  saveUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.storageKey);
    }
    this.updateUI();
  }

  login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // Match against our demo personas
    const matchedDemo = DEMO_PERSONAS.find(p => 
      p.email.toLowerCase() === cleanEmail ||
      cleanEmail.includes(p.name.split(' ')[0].toLowerCase())
    );

    if (matchedDemo) {
      this.saveUser(matchedDemo);
      return matchedDemo;
    }

    // Custom user registration/login
    const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const user = {
      name: formattedName,
      email: email,
      phone: '+1 (555) 234-5678',
      role: 'Ferrari Scuderia Member',
      vehicle: '2025 Ferrari SF90 Stradale',
      image: 'assets/images/ferrari-sf90.webp',
      regNo: 'FER-' + Math.floor(1000 + Math.random() * 9000),
      policyNo: 'FR-SF90-' + Math.floor(10000 + Math.random() * 90000),
      plan: 'Rosso Corsa Zero-Depreciation & Hybrid Shield',
      idv: '$585,000',
      expiry: 'Nov 18, 2027',
      driverScore: 97,
      safeDiscount: '30% ($1,620)',
      validDays: '385 Days',
      avatar: (formattedName[0] || 'U').toUpperCase(),
      addons: [
        { icon: 'shield-check', title: 'Zero Depreciation Apex', desc: '100% parts & labor reimbursement' },
        { icon: 'zap', title: 'Hybrid V8 Battery Shield', desc: 'High-voltage cell immersion protection' },
        { icon: 'disc', title: 'Brembo Carbon-Ceramic Shield', desc: 'Brake rotor wear & track disc cover' },
        { icon: 'truck', title: '24/7 Enclosed Hydraulic Flatbed', desc: 'Unlimited priority roadside dispatch' }
      ],
      claims: [
        { id: 'CLM-' + Math.floor(10000 + Math.random() * 90000), stage: 'CLAIM SETTLED: CASHLESS', workshop: 'Maranello Certified Facility', estReady: 'Settled Oct 2026', amount: '$3,200', isSettled: true }
      ]
    };

    this.saveUser(user);
    return user;
  }

  logout() {
    this.saveUser(null);
    if (window.playHapticSound) window.playHapticSound('click');
    if (window.showToast) window.showToast('Signed out successfully.', 'info');
    
    // Redirect if on policyholder portal
    if (window.location.pathname.endsWith('dashboard.html') || window.location.pathname.endsWith('dashboard')) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 400);
    }
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateUI();
      this.bindAuthForms();
    });
  }

  updateUI() {
    const user = this.currentUser;

    // Top Telemetry logged-in indicators
    const telemetryContainers = document.querySelectorAll('.auth-telemetry-badge');
    telemetryContainers.forEach(el => {
      if (user) {
        el.innerHTML = `
          <div class="flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 text-[10px] sm:text-xs font-mono shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span class="opacity-75">LOGGED IN:</span>
            <span class="font-bold text-white tracking-wider">${user.email}</span>
          </div>
        `;
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Header Auth Action Buttons (Desktop)
    const authActions = document.querySelectorAll('.header-auth-actions');
    authActions.forEach(container => {
      if (user) {
        container.innerHTML = `
          <div class="relative group">
            <a href="dashboard.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-red-500/40 hover:border-red-400 text-white transition-all shadow-md">
              <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                ${user.avatar || 'U'}
              </div>
              <div class="hidden xl:flex flex-col text-left">
                <span class="text-xs font-bold text-white leading-tight">${user.name}</span>
                <span class="text-[9px] font-mono text-red-400">${user.policyNo}</span>
              </div>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400"></i>
            </a>
            
            <!-- User Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0b080b]/95 border border-red-500/30 shadow-2xl p-2 hidden group-hover:block z-50 backdrop-blur-xl">
              <div class="px-3 py-2 border-b border-red-950/60">
                <p class="text-xs font-bold text-white truncate">${user.name}</p>
                <p class="text-[10px] font-mono text-slate-400 truncate">${user.email}</p>
                <div class="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-red-950 text-red-300 border border-red-800/50">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span> ${user.role}
                </div>
              </div>
              <div class="py-1">
                <a href="dashboard.html" class="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-red-400 hover:bg-slate-900/60 rounded-lg">
                  <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i> Policyholder Portal
                </a>
                <a href="claims.html" class="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-red-400 hover:bg-slate-900/60 rounded-lg">
                  <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Express Claims
                </a>
                <a href="quote.html" class="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-red-400 hover:bg-slate-900/60 rounded-lg">
                  <i data-lucide="calculator" class="w-3.5 h-3.5"></i> Premium Calculator
                </a>
              </div>
              <div class="pt-1 border-t border-red-950/60">
                <button onclick="window.auth.logout()" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors">
                  <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Sign Out
                </button>
              </div>
            </div>
          </div>
          <a href="quote.html" class="btn-pill-red px-5 py-2 text-xs uppercase tracking-wider font-bold hidden sm:inline-flex">GET STARTED</a>
        `;
      } else {
        container.innerHTML = `
          <button onclick="window.openLoginModal()" class="nav-login-btn px-4 sm:px-5 py-2 rounded-full border border-red-500/40 hover:border-red-400 bg-white/[0.06] hover:bg-red-950/50 text-xs uppercase tracking-wider font-bold text-white transition-all flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <i data-lucide="user" class="w-3.5 h-3.5 text-red-400"></i>
            <span>LOGIN</span>
          </button>
          <a href="quote.html" class="btn-pill-red px-5 sm:px-6 py-2.5 text-xs uppercase tracking-wider font-bold shadow-lg">GET STARTED</a>
        `;
      }
      if (window.lucide) window.lucide.createIcons();
    });

    // Mobile Drawer Auth Action Container
    const mobileAuthContainers = document.querySelectorAll('#mobile-auth-actions, .mobile-auth-container');
    mobileAuthContainers.forEach(container => {
      if (user) {
        container.innerHTML = `
          <div class="p-3 rounded-2xl bg-black/80 border border-red-500/40 text-left mb-3">
            <div class="flex items-center gap-2.5 mb-2">
              <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                ${user.avatar || 'U'}
              </div>
              <div class="truncate">
                <div class="text-xs font-bold text-white truncate">${user.name}</div>
                <div class="text-[10px] font-mono text-red-400 truncate">${user.policyNo}</div>
              </div>
            </div>
            <button onclick="window.auth.logout()" class="w-full py-2 rounded-xl bg-red-950/70 border border-red-800/50 text-xs font-mono text-red-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
              <span>Sign Out</span>
            </button>
          </div>
          <a href="dashboard.html" class="block w-full py-2.5 text-center btn-pill-red text-xs uppercase tracking-wider font-bold">PORTAL CONSOLE</a>
        `;
      } else {
        container.innerHTML = `
          <button onclick="window.openLoginModal()" class="block w-full py-2.5 text-center rounded-xl bg-white/[0.06] border border-red-500/40 text-xs font-bold uppercase tracking-wider text-white hover:border-red-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center justify-center gap-2 backdrop-blur-md">
            <i data-lucide="user" class="w-4 h-4 text-red-400"></i>
            <span>LOGIN / SIGN IN</span>
          </button>
          <a href="quote.html" class="block w-full py-2.5 text-center btn-pill-red text-xs uppercase tracking-wider font-bold">GET STARTED</a>
        `;
      }
      if (window.lucide) window.lucide.createIcons();
    });

    // Populate dashboard-specific user elements if on dashboard.html
    if (user) {
      document.querySelectorAll('.user-email-display').forEach(el => el.textContent = user.email);
      document.querySelectorAll('.user-name-display').forEach(el => el.textContent = user.name);
      document.querySelectorAll('.user-vehicle-display').forEach(el => el.textContent = user.vehicle);
      document.querySelectorAll('.user-policy-display').forEach(el => el.textContent = user.policyNo);
      document.querySelectorAll('.user-reg-display').forEach(el => el.textContent = user.regNo);
      document.querySelectorAll('.user-role-display').forEach(el => el.textContent = user.role || 'Scuderia VIP Member');
      document.querySelectorAll('.user-plan-display').forEach(el => el.textContent = user.plan || 'Rosso Corsa Shield');

      const idvEl = document.getElementById('dash-idv-display');
      if (idvEl && user.idv) idvEl.textContent = user.idv;

      const scoreEl = document.getElementById('dash-score-display');
      if (scoreEl && user.driverScore) scoreEl.textContent = `${user.driverScore} / 100`;

      const discountEl = document.getElementById('dash-discount-display');
      if (discountEl && user.safeDiscount) discountEl.textContent = user.safeDiscount;

      const expiryEl = document.getElementById('dash-expiry-display');
      if (expiryEl && user.expiry) expiryEl.textContent = user.expiry;

      const bannerImg = document.getElementById('dash-vehicle-banner-img');
      if (bannerImg && user.image) {
        bannerImg.src = user.image;
      }

      // Populate respective add-on shields
      const addonsContainer = document.getElementById('dash-addons-container');
      if (addonsContainer && user.addons && user.addons.length > 0) {
        addonsContainer.innerHTML = user.addons.map(a => `
          <div class="p-3.5 rounded-xl bg-black/60 border border-red-950/80 hover:border-red-500/40 transition-colors flex items-center gap-3 text-xs">
            <div class="w-8 h-8 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <i data-lucide="${a.icon}" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="font-bold text-white tracking-wide">${a.title}</span>
              <p class="text-[11px] text-slate-400 mt-0.5">${a.desc}</p>
            </div>
          </div>
        `).join('');
      }

      // Populate respective claim status
      const claimContainer = document.getElementById('dash-claim-status-box');
      if (claimContainer && user.claims && user.claims.length > 0) {
        const c = user.claims[0];
        claimContainer.innerHTML = `
          <div class="p-4 rounded-xl bg-black/70 border border-red-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold text-white text-sm">${c.id}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[9px] font-mono ${c.isSettled ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-red-950 text-red-300 border border-red-800/60 animate-pulse'}">
                  ${c.stage}
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1">Workshop: ${c.workshop} &bull; ${c.estReady}</p>
            </div>
            <div class="text-left sm:text-right">
              <span class="text-[10px] font-mono text-slate-400 uppercase">CASHLESS COVERAGE:</span>
              <div class="font-mono text-lg font-bold text-emerald-400">${c.amount}</div>
            </div>
          </div>
        `;
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  bindAuthForms() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        if (!email || !pass) {
          if (window.showToast) window.showToast('Please enter both email and password', 'error');
          return;
        }

        // Realistic submit state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>VERIFYING MARANELLO VAULT...</span>
          `;
        }

        setTimeout(() => {
          const loggedUser = this.login(email, pass);
          if (window.playHapticSound) window.playHapticSound('success');
          if (window.showToast) window.showToast(`Authentication Verified! Welcome, ${loggedUser.name}!`, 'success');

          if (submitBtn) {
            submitBtn.innerHTML = `
              <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
              <span>LAUNCHING CONSOLE...</span>
            `;
            if (window.lucide) window.lucide.createIcons();
          }

          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 600);
        }, 800);
      });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const vehicle = document.getElementById('signup-vehicle') ? document.getElementById('signup-vehicle').value : '2025 Ferrari SF90 Stradale';
        const regNo = document.getElementById('signup-reg') ? document.getElementById('signup-reg').value : 'FER-SF90-01';

        const submitBtn = signupForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>ISSUING MARANELLO POLICY...</span>
          `;
        }

        setTimeout(() => {
          const newUser = {
            name: name || 'Policyholder',
            email: email,
            phone: phone || '+1 (555) 000-0000',
            role: 'Comprehensive Ferrari Member',
            vehicle: vehicle,
            image: vehicle.includes('Pista') ? 'assets/images/ferrari-pista.webp' : vehicle.includes('Roma') ? 'assets/images/ferrari-roma-sunset.webp' : 'assets/images/ferrari-sf90.webp',
            regNo: regNo,
            policyNo: 'FR-SF90-' + Math.floor(10000 + Math.random() * 90000),
            plan: 'Rosso Corsa Zero-Depreciation & Hybrid Shield',
            idv: '$585,000',
            expiry: 'Nov 18, 2027',
            driverScore: 98,
            safeDiscount: '30% ($1,620)',
            validDays: '385 Days',
            avatar: (name ? name[0] : 'U').toUpperCase(),
            addons: [
              { icon: 'shield-check', title: 'Zero Depreciation Apex', desc: '100% parts & labor reimbursement' },
              { icon: 'zap', title: 'Hybrid V8 Battery Shield', desc: 'High-voltage cell immersion protection' },
              { icon: 'disc', title: 'Brembo Carbon-Ceramic Shield', desc: 'Brake rotor wear & track disc cover' },
              { icon: 'truck', title: '24/7 Enclosed Hydraulic Flatbed', desc: 'Unlimited priority roadside dispatch' }
            ],
            claims: [
              { id: 'CLM-' + Math.floor(10000 + Math.random() * 90000), stage: 'CLAIM SETTLED: CASHLESS', workshop: 'Maranello Official Service Bay', estReady: 'Settled Oct 2026', amount: '$3,200', isSettled: true }
            ]
          };

          this.saveUser(newUser);
          if (window.showToast) window.showToast('Account created & Ferrari Shield issued!', 'success');
          if (window.playHapticSound) window.playHapticSound('success');
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 600);
        }, 800);
      });
    }
  }

  setDemoUser(index) {
    if (DEMO_PERSONAS[index]) {
      this.saveUser(DEMO_PERSONAS[index]);
      if (window.showToast) window.showToast(`Switched to demo persona: ${DEMO_PERSONAS[index].name}`, 'info');
      if (window.playHapticSound) window.playHapticSound('click');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    }
  }
}

window.auth = new AuthManager();

// Global Interactive Glass Login Modal
window.openLoginModal = function() {
  if (window.playHapticSound) window.playHapticSound('click');
  let modal = document.getElementById('glass-login-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'glass-login-modal';
    modal.className = 'fixed inset-0 z-[10050] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-all duration-300';
    modal.innerHTML = `
      <div class="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0b080b]/95 border border-red-500/40 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_45px_rgba(239,68,68,0.3)] backdrop-blur-2xl text-left overflow-hidden">
        
        <!-- Ambient Crimson Glow Halo -->
        <div class="absolute -top-12 -right-12 w-36 h-36 bg-red-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-36 h-36 bg-red-950/40 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-red-950/70 relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-display text-lg sm:text-xl font-black text-white tracking-wide uppercase">POLICYHOLDER LOGIN</h3>
              <p class="text-[10px] font-mono text-red-400">SECURE 256-BIT FERRARI GATEWAY</p>
            </div>
          </div>
          <button onclick="window.closeLoginModal()" class="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-red-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- 1-Click Ferrari VIP Quick Login Personas -->
        <div class="my-4 p-3.5 rounded-2xl bg-black/60 border border-red-900/40 relative z-10 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold">⚡ 1-Click VIP Member Login:</span>
            <span class="text-[9px] font-mono text-slate-500">Tap to Authenticate</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button type="button" onclick="window.quickModalLogin(0)" class="p-2 rounded-xl bg-slate-900/90 border border-red-900/50 hover:border-red-500 text-left transition-all hover:scale-[1.02] group">
              <div class="text-[11px] font-bold text-white group-hover:text-red-400 truncate">Alexander</div>
              <div class="text-[9px] font-mono text-red-400 truncate">SF90 • VIP</div>
            </button>
            <button type="button" onclick="window.quickModalLogin(1)" class="p-2 rounded-xl bg-slate-900/90 border border-red-900/50 hover:border-red-500 text-left transition-all hover:scale-[1.02] group">
              <div class="text-[11px] font-bold text-white group-hover:text-red-400 truncate">Elena</div>
              <div class="text-[9px] font-mono text-red-400 truncate">F8 • Club</div>
            </button>
            <button type="button" onclick="window.quickModalLogin(2)" class="p-2 rounded-xl bg-slate-900/90 border border-red-900/50 hover:border-red-500 text-left transition-all hover:scale-[1.02] group">
              <div class="text-[11px] font-bold text-white group-hover:text-red-400 truncate">Marcus</div>
              <div class="text-[9px] font-mono text-red-400 truncate">296 • Tech</div>
            </button>
          </div>
        </div>

        <!-- Email & Password Form -->
        <form onsubmit="window.handleModalLogin(event)" class="space-y-3.5 relative z-10">
          <div>
            <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">Email / Member ID</label>
            <div class="relative">
              <i data-lucide="mail" class="w-4 h-4 text-red-400 absolute left-3.5 top-3"></i>
              <input type="email" id="modal-login-email" required placeholder="alexander.wright@ferrari-vip.io" value="alexander.wright@ferrari-vip.io" class="w-full bg-black/70 border border-red-900/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-red-500 outline-none">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-[11px] font-mono uppercase text-slate-300">Password</label>
              <span class="text-[10px] font-mono text-red-400">Demo Active</span>
            </div>
            <div class="relative">
              <i data-lucide="lock" class="w-4 h-4 text-red-400 absolute left-3.5 top-3"></i>
              <input type="password" id="modal-login-password" required value="maranello2026" class="w-full bg-black/70 border border-red-900/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono focus:border-red-500 outline-none">
            </div>
          </div>

          <button type="submit" class="w-full py-3 rounded-xl btn-pill-red text-xs uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-red-600/40">
            <span>SIGN IN TO CONSOLE</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>

        <div class="mt-4 pt-3 border-t border-red-950/60 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <span>Need full login page?</span>
          <a href="login.html" class="text-red-400 hover:underline font-bold font-mono">Open Gateway &rarr;</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) window.lucide.createIcons();
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeLoginModal();
    });
  } else {
    modal.classList.remove('hidden');
  }
};

window.closeLoginModal = function() {
  const modal = document.getElementById('glass-login-modal');
  if (modal) modal.classList.add('hidden');
};

window.quickModalLogin = function(idx) {
  if (DEMO_PERSONAS[idx]) {
    window.auth.saveUser(DEMO_PERSONAS[idx]);
    window.closeLoginModal();
    if (window.playHapticSound) window.playHapticSound('success');
    if (window.showToast) window.showToast(`Authenticated as ${DEMO_PERSONAS[idx].name}!`, 'success');
    if (window.location.pathname.endsWith('dashboard.html') || window.location.pathname.endsWith('dashboard')) {
      window.auth.updateUI();
    } else {
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 400);
    }
  }
};

window.handleModalLogin = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('modal-login-email');
  const passInput = document.getElementById('modal-login-password');
  const email = emailInput ? emailInput.value.trim() : 'alexander.wright@ferrari-vip.io';
  const pass = passInput ? passInput.value.trim() : 'demo';

  const user = window.auth.login(email, pass);
  window.closeLoginModal();
  if (window.playHapticSound) window.playHapticSound('success');
  if (window.showToast) window.showToast(`Login Successful! Active member: ${user.name}`, 'success');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 400);
};
