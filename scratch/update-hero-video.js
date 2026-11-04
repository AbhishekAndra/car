const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the button in the hero
html = html.replace(
  /<button onclick="toggleFerrariView\(\)"[\s\S]*?<\/button>/i,
  `<button onclick="switchHeroVideoAngle()" class="px-4 py-2.5 rounded-full bg-black/70 border border-red-500/40 hover:border-red-400 text-slate-200 hover:text-white text-xs font-mono tracking-wider transition-all flex items-center gap-2 backdrop-blur-md shadow-lg">
              <i data-lucide="video" class="w-3.5 h-3.5 text-red-500"></i>
              <span id="ferrari-toggle-label">Switch Camera Angle</span>
            </button>`
);

// Replace the car image container with the cinematic video stage
const videoHeroSection = `<!-- CINEMATIC FERRARI SUPERCAR VIDEO HERO STAGE -->
    <div class="relative w-full z-20 mt-8 sm:mt-12 pb-6">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <!-- Ambient Crimson Ferrari Underglow Halo -->
        <div class="relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-red-500/35 to-red-600/20 rounded-[32px] sm:rounded-[40px] blur-2xl pointer-events-none"></div>

          <!-- Cinema Frame Container -->
          <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-red-500/50 bg-[#060405] shadow-[0_30px_70px_rgba(0,0,0,0.95)] group">
            
            <!-- Video Player -->
            <video 
              id="hero-ferrari-video" 
              class="w-full h-72 sm:h-96 md:h-[460px] lg:h-[500px] object-cover transition-all duration-500" 
              autoplay 
              muted 
              loop 
              playsinline
              poster="assets/videos/frame-28s.jpg">
              <source id="hero-video-source-mp4" src="assets/videos/ferrari-spider-loop.mp4" type="video/mp4">
              <source id="hero-video-source-webm" src="assets/videos/ferrari-spider.webm" type="video/webm">
              Your browser does not support HTML5 video.
            </video>

            <!-- Video Top Vignette Gradient Overlay -->
            <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>

            <!-- Top HUD Telemetry Bar Overlay -->
            <div class="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between pointer-events-none z-10">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 border border-red-500/60 backdrop-blur-md shadow-lg">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span class="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-red-300">
                  LIVE FERRARI TELEMETRY CAM
                </span>
                <span class="hidden sm:inline text-slate-500 text-xs">&bull;</span>
                <span class="hidden sm:inline text-[10px] font-mono text-slate-300">4K 60FPS</span>
              </div>

              <!-- Speed & RPM Telemetry Gauge -->
              <div class="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/85 border border-red-950/80 backdrop-blur-md text-[10px] sm:text-xs font-mono shadow-lg">
                <span class="text-slate-400">SPEED: <strong id="hero-speed-gauge" class="text-red-400 font-bold">284 KM/H</strong></span>
                <span class="text-slate-600 hidden sm:inline">|</span>
                <span class="hidden sm:inline text-slate-400">RPM: <strong id="hero-rpm-gauge" class="text-white">8,200</strong></span>
                <span class="text-slate-600 hidden sm:inline">|</span>
                <span class="text-emerald-400 hidden sm:inline font-bold">AGREED VALUE ACTIVE</span>
              </div>
            </div>

            <!-- Bottom Video HUD & Controls Bar Overlay -->
            <div class="absolute bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10 pointer-events-auto">
              
              <!-- Vehicle Description Tag -->
              <div class="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/90 border border-red-900/70 backdrop-blur-md shadow-lg">
                <div class="w-7 h-7 rounded-lg bg-red-950 border border-red-500 flex items-center justify-center text-red-400">
                  <i data-lucide="shield-check" class="w-4 h-4"></i>
                </div>
                <div class="text-left">
                  <div id="video-vehicle-title" class="text-xs sm:text-sm font-extrabold text-white tracking-wide">Ferrari F430 Spider &bull; Rosso Corsa</div>
                  <div id="video-vehicle-subtitle" class="text-[10px] font-mono text-red-400">FPV Dynamic Track Telemetry &bull; Maranello Protocol</div>
                </div>
              </div>

              <!-- Interactive Controls (Switch Angle, Play/Pause, Sound, Fullscreen) -->
              <div class="flex items-center gap-2 self-end sm:self-auto">
                
                <!-- Angle Switcher Button -->
                <button onclick="switchHeroVideoAngle()" class="px-3 py-2 rounded-xl bg-black/90 border border-red-500/50 hover:border-red-400 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg">
                  <i data-lucide="video" class="w-3.5 h-3.5 text-red-500"></i>
                  <span id="video-angle-label">Next Angle</span>
                </button>

                <!-- Play/Pause Toggle -->
                <button onclick="toggleHeroVideoPlay()" id="video-play-btn" class="p-2 sm:px-3 sm:py-2 rounded-xl bg-black/90 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1 backdrop-blur-md transition-all shadow-lg" title="Play / Pause">
                  <i data-lucide="pause" class="w-4 h-4 text-red-400"></i>
                  <span class="hidden sm:inline" id="video-play-label">Pause</span>
                </button>

                <!-- Audio Mute/Unmute Toggle -->
                <button onclick="toggleHeroVideoSound()" id="video-sound-btn" class="p-2 sm:px-3 sm:py-2 rounded-xl bg-black/90 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1 backdrop-blur-md transition-all shadow-lg" title="Mute / Unmute">
                  <i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>
                  <span class="hidden sm:inline" id="video-sound-label">Unmute</span>
                </button>

                <!-- Fullscreen Button -->
                <button onclick="toggleHeroVideoFullscreen()" class="p-2 rounded-xl bg-black/90 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white backdrop-blur-md transition-all shadow-lg" title="Fullscreen">
                  <i data-lucide="maximize" class="w-4 h-4 text-slate-400"></i>
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>`;

// Replace the old car image container
const oldCarContainerRegex = /<!--\s*Foreground Glossy Rosso Corsa Ferrari Sports Car[\s\S]*?<\/section>/i;
if (oldCarContainerRegex.test(html)) {
  html = html.replace(oldCarContainerRegex, videoHeroSection + '\n\n  </section>');
  console.log('[Replaced] Old car image with Cinematic Ferrari Video Hero Stage');
} else {
  console.warn('[Marker Not Found] oldCarContainerRegex');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html with video hero!');
