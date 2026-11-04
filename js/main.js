/**
 * Vanguard Motor Assure - Main Application Runtime
 * Includes Lenis Smooth Scroll, Web Audio Haptics, Telemetry & Preloader
 */

// Web Audio API Acoustic Feedback Generator
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  play(type = 'click') {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'scan') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // Audio context policy safe ignore
    }
  }
}

window.soundFX = new SoundFX();
window.playHapticSound = (type) => window.soundFX.play(type);

// Global Toast Notification
window.showToast = function(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let icon = 'info';
  let borderCol = 'rgba(0, 240, 255, 0.4)';
  if (type === 'success') {
    icon = 'check-circle-2';
    borderCol = 'rgba(16, 185, 129, 0.5)';
  } else if (type === 'error') {
    icon = 'alert-triangle';
    borderCol = 'rgba(244, 63, 94, 0.5)';
  } else if (type === 'sos') {
    icon = 'siren';
    borderCol = 'rgba(239, 68, 68, 0.8)';
  }

  toast.style.borderColor = borderCol;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 ${type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : type === 'sos' ? 'text-red-500 animate-pulse' : 'text-cyan-400'} shrink-0"></i>
    <span class="text-xs sm:text-sm font-medium">${msg}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4200);
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Preloader Logic
  const preloader = document.getElementById('luxury-preloader');
  const preloaderProgress = document.getElementById('preloader-progress');
  const preloaderCount = document.getElementById('preloader-count');

  if (preloader && preloaderProgress && preloaderCount) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        preloaderProgress.style.width = '100%';
        preloaderCount.textContent = '100';
        setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
          }, 600);
        }, 250);
      } else {
        preloaderProgress.style.width = progress + '%';
        preloaderCount.textContent = progress;
      }
    }, 45);
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  // Global Scroll Progress Bar & Glass Header Scroll Effect
  const progressBar = document.getElementById('global-scroll-progress');
  const mainHeader = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (progressBar) {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }
    if (mainHeader) {
      if (winScroll > 20) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // Initialize Lenis Smooth Scroll
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenisInstance = lenis;
  }

  // Live Meridian Telemetry Clock & Ticker
  function updateTelemetryClock() {
    const timeEls = document.querySelectorAll('.live-telemetry-time');
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSecs = String(now.getUTCSeconds()).padStart(2, '0');
    const formatted = `${utcHours}:${utcMins}:${utcSecs} UTC`;

    timeEls.forEach(el => el.textContent = formatted);
  }
  setInterval(updateTelemetryClock, 1000);
  updateTelemetryClock();

  // Mobile Menu Drawer Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('translate-x-full');
      window.playHapticSound('click');
    });
  }
  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('translate-x-full');
      window.playHapticSound('click');
    });
  }

  // Sound triggers on interactive buttons
  document.querySelectorAll('button, .interactive-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.playHapticSound('click');
    });
  });

  // Emergency SOS Trigger
  const sosTriggers = document.querySelectorAll('.trigger-sos-modal');
  sosTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.playHapticSound('alert');
      openEmergencySOSModal();
    });
  });

  // Hero Ferrari Video Autoplay Reliability
  const heroVideo = document.getElementById('hero-ferrari-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      const onFirstGesture = () => {
        heroVideo.play().catch(() => {});
        window.removeEventListener('click', onFirstGesture);
        window.removeEventListener('touchstart', onFirstGesture);
        window.removeEventListener('scroll', onFirstGesture);
      };
      window.addEventListener('click', onFirstGesture, { once: true });
      window.addEventListener('touchstart', onFirstGesture, { once: true });
      window.addEventListener('scroll', onFirstGesture, { once: true });
    });
  }

  // Initialize Hero Showcase Swiper (Background Images Slider)
  if (typeof Swiper !== 'undefined') {
    const heroSwiperEl = document.querySelector('.hero-showcase-swiper');
    if (heroSwiperEl) {
      const heroSwiper = new Swiper('.hero-showcase-swiper', {
        loop: true,
        speed: 700,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 4200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        grabCursor: true,
        pagination: {
          el: '.hero-swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.hero-swiper-next',
          prevEl: '.hero-swiper-prev'
        },
        on: {
          slideChange: function () {
            if (window.lucide) window.lucide.createIcons();
          }
        }
      });
      window.heroShowcaseSwiper = heroSwiper;
    }
  }
});

// Emergency SOS Roadside Assistance Modal
function openEmergencySOSModal() {
  let modal = document.getElementById('emergency-sos-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'emergency-sos-modal';
    modal.className = 'fixed inset-0 z-[10020] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md';
    modal.innerHTML = `
      <div class="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-red-500/50 p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
        <div class="absolute -top-12 -right-12 w-36 h-36 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <i data-lucide="siren" class="w-5 h-5 animate-pulse"></i>
            </div>
            <div>
              <h3 class="font-display text-xl font-bold text-white tracking-wide">24/7 ROADSIDE SOS DISPATCH</h3>
              <p class="text-xs text-red-400 font-mono">PRIORITY 1 EMERGENCY CHANNEL</p>
            </div>
          </div>
          <button onclick="closeEmergencySOSModal()" class="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-6">
          Immediate assistance for breakdown, battery jump-start, flat tyre, accident towing, or fuel replenishment. Our nearest Vanguard Patrol will reach you in approximately <span class="text-cyan-400 font-bold">14-18 minutes</span>.
        </p>

        <form id="sos-dispatch-form" onsubmit="handleSOSDispatch(event)" class="space-y-4">
          <div>
            <label class="block text-[11px] uppercase tracking-wider font-mono text-slate-400 mb-1">Current GPS Location / Landmark</label>
            <div class="relative">
              <input type="text" id="sos-location" required value="Detecting live GPS coordinates (40.7128° N, 74.0060° W)..." class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-red-500 outline-none">
              <i data-lucide="map-pin" class="w-4 h-4 text-cyan-400 absolute right-3 top-3"></i>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] uppercase tracking-wider font-mono text-slate-400 mb-1">Vehicle Plate / Policy #</label>
              <input type="text" id="sos-plate" required placeholder="NY-APX-9942" value="${(window.auth && window.auth.currentUser) ? window.auth.currentUser.regNo : 'NY-APX-9942'}" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-red-500 outline-none">
            </div>
            <div>
              <label class="block text-[11px] uppercase tracking-wider font-mono text-slate-400 mb-1">Assistance Type</label>
              <select id="sos-type" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none">
                <option value="Towing">Flatbed Towing</option>
                <option value="Battery">Battery Jump-Start</option>
                <option value="Tyre">Flat Tyre Replacement</option>
                <option value="Fuel">Emergency Fuel Runout</option>
                <option value="Accident">Accident / Collision SOS</option>
              </select>
            </div>
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>DISPATCH PATROL VEHICLE NOW</span>
            </button>
          </div>
        </form>

        <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Direct Toll-Free Line:</span>
          <a href="tel:18008264827" class="font-mono text-cyan-400 hover:underline font-bold">1-800-VANGUARD (826-4827)</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) window.lucide.createIcons();
  } else {
    modal.classList.remove('hidden');
  }
}

function closeEmergencySOSModal() {
  const modal = document.getElementById('emergency-sos-modal');
  if (modal) modal.classList.add('hidden');
}

function handleSOSDispatch(e) {
  e.preventDefault();
  const loc = document.getElementById('sos-location').value;
  const plate = document.getElementById('sos-plate').value;
  const type = document.getElementById('sos-type').value;

  closeEmergencySOSModal();
  window.playHapticSound('success');
  window.showToast(`SOS Dispatched! Vanguard Rescue Truck #42 en route to ${plate}. Estimated arrival: 14 mins.`, 'sos');
}

// 24/7 Callmy Driver Concierge & Live Chat Drawer
window.openConciergeChat = function() {
  window.playHapticSound('click');
  let chatDrawer = document.getElementById('concierge-chat-drawer');
  if (!chatDrawer) {
    chatDrawer = document.createElement('div');
    chatDrawer.id = 'concierge-chat-drawer';
    chatDrawer.className = 'fixed bottom-24 left-6 z-[9990] w-88 sm:w-96 rounded-2xl bg-[#090f1e] border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-4 flex flex-col gap-3 transition-all transform';
    chatDrawer.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-2.5">
          <div class="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090f1e]"></span>
          </div>
          <div>
            <div class="text-xs font-bold text-white font-display">CALLMY DRIVER CONCIERGE</div>
            <div class="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span>● Live Concierge Online</span>
            </div>
          </div>
        </div>
        <button onclick="window.closeConciergeChat()" class="text-slate-400 hover:text-white p-1">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="space-y-2 py-1 max-h-60 overflow-y-auto text-xs" id="concierge-chat-logs">
        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-slate-300">
          <p class="font-semibold text-white mb-1">Hello! How can Callmy Driver assist you today?</p>
          <p class="text-[11px] text-slate-400">Choose a quick option or type your request below:</p>
        </div>
      </div>

      <!-- Quick Action Pills -->
      <div class="flex flex-wrap gap-1.5 pt-1">
        <button onclick="window.sendConciergeQuick('Need a Professional Chauffeur now')" class="px-2.5 py-1 rounded-full bg-blue-950/80 hover:bg-blue-900 border border-blue-700/50 text-[10px] text-blue-200 transition-colors">
          🚗 Book Chauffeur
        </button>
        <button onclick="window.sendConciergeQuick('Check my Vehicle Insurance Policy')" class="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] text-slate-300 transition-colors">
          📋 Check Policy
        </button>
        <button onclick="window.sendConciergeQuick('Emergency Towing / SOS breakdown')" class="px-2.5 py-1 rounded-full bg-red-950/80 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 transition-colors">
          🚨 Roadside SOS
        </button>
      </div>

      <!-- Input Bar -->
      <form onsubmit="window.handleConciergeSubmit(event)" class="flex gap-2 pt-1 border-t border-slate-800">
        <input type="text" id="concierge-chat-input" placeholder="Type message..." class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400">
        <button type="submit" class="btn-pill-blue px-4 py-2 text-xs font-bold shrink-0">
          <i data-lucide="send" class="w-3.5 h-3.5"></i>
        </button>
      </form>
    `;
    document.body.appendChild(chatDrawer);
    if (window.lucide) window.lucide.createIcons();
  } else {
    chatDrawer.classList.toggle('hidden');
  }
};

window.closeConciergeChat = function() {
  const chatDrawer = document.getElementById('concierge-chat-drawer');
  if (chatDrawer) chatDrawer.classList.add('hidden');
};

window.sendConciergeQuick = function(msg) {
  const log = document.getElementById('concierge-chat-logs');
  if (!log) return;
  window.playHapticSound('click');
  const userMsg = document.createElement('div');
  userMsg.className = 'bg-blue-600/90 text-white rounded-xl p-2.5 ml-8 text-xs text-right';
  userMsg.textContent = msg;
  log.appendChild(userMsg);

  setTimeout(() => {
    window.playHapticSound('success');
    const botMsg = document.createElement('div');
    botMsg.className = 'bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 mr-6 text-xs text-slate-300';
    if (msg.includes('Chauffeur')) {
      botMsg.innerHTML = '<span class="text-blue-400 font-semibold">Concierge:</span> Matching you with a verified 5-star professional chauffeur nearby. Estimated pickup: 12 mins. Tap <a href="quote.html" class="underline text-white font-bold">Confirm Booking</a>.';
    } else if (msg.includes('SOS')) {
      botMsg.innerHTML = '<span class="text-red-400 font-semibold">Emergency SOS:</span> GPS coordinates received. Dispatching Vanguard flatbed patrol #42. Tap <a href="contact.html" class="underline text-white font-bold">Track Live GPS</a>.';
    } else {
      botMsg.innerHTML = '<span class="text-emerald-400 font-semibold">Concierge:</span> Your policy is active with 100% Zero-Depreciation. Solvency 2.45x guaranteed. Visit your <a href="dashboard.html" class="underline text-white font-bold">Policyholder Portal</a> for certificates.';
    }
    log.appendChild(botMsg);
    log.scrollTop = log.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }, 400);
  log.scrollTop = log.scrollHeight;
};

window.handleConciergeSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('concierge-chat-input');
  if (!input || !input.value.trim()) return;
  const val = input.value.trim();
  input.value = '';
  window.sendConciergeQuick(val);
};

// Ferrari & Supercar Cinematic Video Feeds & Angle Switcher
const FERRARI_VIDEO_FEEDS = [
  {
    mp4: 'assets/videos/ferrari-spider-loop.mp4',
    webm: 'assets/videos/ferrari-spider.webm',
    poster: 'assets/videos/frame-28s.webp',
    title: 'Ferrari F430 Spider • Rosso Corsa',
    subtitle: 'FPV Dynamic Track Telemetry • Maranello Protocol',
    nextLabel: 'View Hypercar Monterey',
    baseSpeed: 284,
    rpm: 8200
  },
  {
    mp4: 'assets/videos/ferrari-f80.mp4',
    webm: 'assets/videos/ferrari-f80.webm',
    poster: 'assets/videos/frame-f80.webp',
    title: 'Ferrari F80 Hypercar • Monterey Pace',
    subtitle: 'Hybrid V6 Twin-Turbo 1,200 HP • Track Protocol',
    nextLabel: 'View Full Aerial FPV',
    baseSpeed: 298,
    rpm: 8900
  },
  {
    mp4: 'assets/videos/ferrari-spider.mp4',
    webm: 'assets/videos/ferrari-spider.webm',
    poster: 'assets/videos/frame-34s.webp',
    title: 'Ferrari F430 Spider • Aerial Forest Run',
    subtitle: 'High-Altitude 4K FPV Drone Chase • Alpine Pass',
    nextLabel: 'View Spider Action Loop',
    baseSpeed: 272,
    rpm: 7800
  }
];

let currentVideoIdx = 0;

window.switchHeroVideoAngle = function() {
  if (window.playHapticSound) window.playHapticSound('click');
  currentVideoIdx = (currentVideoIdx + 1) % FERRARI_VIDEO_FEEDS.length;
  const feed = FERRARI_VIDEO_FEEDS[currentVideoIdx];
  const video = document.getElementById('hero-ferrari-video');
  const sourceMp4 = document.getElementById('hero-video-source-mp4');
  const sourceWebm = document.getElementById('hero-video-source-webm');
  const titleEl = document.getElementById('video-vehicle-title');
  const subEl = document.getElementById('video-vehicle-subtitle');
  const angleLabel = document.getElementById('video-angle-label');
  const topAngleLabel = document.getElementById('ferrari-toggle-label');

  if (video) {
    video.style.opacity = '0.3';
    setTimeout(() => {
      video.poster = feed.poster;
      if (sourceMp4) sourceMp4.src = feed.mp4;
      if (sourceWebm) sourceWebm.src = feed.webm;
      video.load();
      video.play().catch(() => {});
      video.style.opacity = '1';
    }, 200);
  }

  if (titleEl) titleEl.textContent = feed.title;
  if (subEl) subEl.textContent = feed.subtitle;
  if (angleLabel) angleLabel.textContent = feed.nextLabel;
  if (topAngleLabel) topAngleLabel.textContent = feed.nextLabel;

  if (window.showToast) window.showToast(`Active Feed: ${feed.title}`, 'info');
};

window.toggleHeroVideoPlay = function() {
  const video = document.getElementById('hero-ferrari-video');
  const label = document.getElementById('video-play-label');
  const btn = document.getElementById('video-play-btn');
  if (!video) return;

  if (window.playHapticSound) window.playHapticSound('click');
  if (video.paused) {
    video.play();
    if (label) label.textContent = 'Pause';
    if (btn) btn.innerHTML = '<i data-lucide="pause" class="w-4 h-4 text-red-400"></i><span class="hidden sm:inline">Pause</span>';
  } else {
    video.pause();
    if (label) label.textContent = 'Play';
    if (btn) btn.innerHTML = '<i data-lucide="play" class="w-4 h-4 text-emerald-400"></i><span class="hidden sm:inline">Play</span>';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.toggleHeroVideoSound = function() {
  const video = document.getElementById('hero-ferrari-video');
  const label = document.getElementById('video-sound-label');
  const btn = document.getElementById('video-sound-btn');
  if (!video) return;

  if (window.playHapticSound) window.playHapticSound('click');
  video.muted = !video.muted;
  if (video.muted) {
    if (label) label.textContent = 'Unmute';
    if (btn) btn.innerHTML = '<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i><span class="hidden sm:inline">Unmute</span>';
  } else {
    if (label) label.textContent = 'Mute';
    if (btn) btn.innerHTML = '<i data-lucide="volume-2" class="w-4 h-4 text-red-400"></i><span class="hidden sm:inline">Mute</span>';
  }
  if (window.lucide) window.lucide.createIcons();
};

window.toggleHeroVideoFullscreen = function() {
  const video = document.getElementById('hero-ferrari-video');
  if (!video) return;
  if (window.playHapticSound) window.playHapticSound('click');

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
};

// Real-Time Speedometer HUD Simulation
setInterval(() => {
  const speedEl = document.getElementById('hero-speed-gauge');
  const rpmEl = document.getElementById('hero-rpm-gauge');
  if (speedEl && rpmEl) {
    const currentFeed = FERRARI_VIDEO_FEEDS[currentVideoIdx];
    const jitter = Math.floor(Math.random() * 9) - 4;
    const currentSpeed = (currentFeed ? currentFeed.baseSpeed : 284) + jitter;
    const currentRpm = (currentFeed ? currentFeed.rpm : 8200) + (jitter * 40);
    speedEl.textContent = `${currentSpeed} KM/H`;
    rpmEl.textContent = currentRpm.toLocaleString();
  }
}, 800);

// Backward compatibility for toggleFerrariView
window.toggleFerrariView = function() {
  window.switchHeroVideoAngle();
};

// Hero Quick Quote Connection to Actuarial Calculator
window.handleHeroQuickQuote = function() {
  const regInput = document.getElementById('hero-reg-input');
  const regVal = (regInput && regInput.value.trim()) ? regInput.value.trim() : 'FER-SF90-01';
  if (window.playHapticSound) window.playHapticSound('click');
  if (window.showToast) window.showToast(`Activating Ferrari Underwriting for ${regVal}...`, 'info');
  setTimeout(() => {
    window.location.href = `quote.html?reg=${encodeURIComponent(regVal)}&brand=Ferrari&model=SF90&plan=maranello`;
  }, 300);
};

// Interactive FAQ Accordion Toggle
window.toggleFaq = function(button) {
  if (window.playHapticSound) window.playHapticSound('click');
  const card = button.parentElement;
  const content = card.querySelector('div.text-xs');
  const chevron = button.querySelector('i[data-lucide="chevron-down"], svg');
  
  if (content) {
    const isHidden = content.classList.contains('hidden');
    // Close other FAQs smoothly
    document.querySelectorAll('#faq-container div.text-xs, section div.text-xs.leading-relaxed').forEach(el => {
      if (el !== content && el.closest('.overflow-hidden')) {
        el.classList.add('hidden');
        const otherChevron = el.parentElement.querySelector('i[data-lucide="chevron-down"], svg');
        if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
      }
    });

    if (isHidden) {
      content.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
      content.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }
};
