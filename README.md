# VANGUARD AUTO — Next-Gen Vehicle Insurance & Mobility Protection Platform

> Ultra-modern, high-performance Vehicle & Motor Insurance web experience featuring real-time Three.js 3D WebGL vehicle inspection, actuarial precision quote engine, 30-minute cashless express claims with AI computer vision damage verification, telematics smart driving simulator, and instant policyholder console. Fully browser-ready with zero build dependencies required.

---

## 🏛️ Dedicated Sub-Pages & Architecture

Every page is a fully responsive, semantic HTML5/CSS3/JavaScript document featuring unified Lenis momentum scrolling, Lucide iconography, Web Audio acoustic haptics, and live regulatory telemetry:

| File | Page Name | Core Capabilities & Visual Interactions |
|---|---|---|
| [`index.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/index.html) | **Homepage & 3D Inspector** | Interactive Three.js 3D WebGL sports coupe/sedan twin with 360° drag orbit, wireframe safety scan mode, dynamic body paint customizer (5 palettes), headlights illumination, camera angle presets (Front ADAS, Side Chassis, Battery Shield, 360° Overview), instant quote entry capsule, 4 pillars of mobility defense, modular add-ons preview, 4-step claims journey, live claims ticker, and Trustpilot rating badges. |
| [`quote.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/quote.html) | **Precision Quote Engine** | Interactive actuarial premium calculator with category switcher (Private Car, Electric EV, Two-Wheeler / Superbike, Commercial Fleet), dynamic make & model selector, IDV interactive valuation slider (±15%), No Claim Bonus (NCB 0% - 50%) bonus buttons, modular add-on toggles with real-time price updates, sticky breakdown card (Own Damage, NCB discount, Third-Party tariff, GST 18%, monthly EMI), downloadable official quote document, and 60-second instant checkout modal. |
| [`plans.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/plans.html) | **Coverage & Policy Blueprints** | 6 dedicated insurance blueprints: Comprehensive Private Car, Zero Depreciation Apex Shield, EV Special High-Voltage Battery Shield, Performance Superbike Cover, Pay-As-You-Drive KM Slabs, and Commercial Fleet Logistics Umbrella. Includes side-by-side comparison matrix with sticky header, feature checks, and transparent Inclusions vs Exclusions tables. |
| [`claims.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/claims.html) | **Express Claims & Cashless Garages** | **AI Damage Vision Inspector simulator** with animated bounding boxes, component recognition, OEM catalog matching, and instant cashless payout calculation. Real-time Live Claim Status Tracker (search by Claim ID or Policy #) with 5-step milestone pipeline, assigned surveyor details, and 10,800+ Cashless Garage locator filtered by city with 1-click slot booking. |
| [`services.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/services.html) | **Services & Telematics Sandbox** | 60-second 1-click policy renewal with 50% NCB retention, interactive **Telematics Smart Drive Score Sandbox** with live reactive circular gauge computing safe driver cashback (up to 35% discount), and instant digital document vault (Policy Certificate, Tax Exemption Receipt, Form 51, Roadside SOS Pass). |
| [`about.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/about.html) | **Corporate Solvency & Governance** | Certified financial transparency: **$5.2B AUM**, **2.45x Solvency Margin** (vs 1.50x statutory minimum), 99.42% 4-hour settlement ratio, Tier-1 reinsurance consortium (Munich Re, Swiss Re, Berkshire Hathaway Specialty Insurance, Lloyd's), executive leadership roster, and regulatory IRDAI compliance credentials. |
| [`contact.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/contact.html) | **Emergency SOS & Support** | 24/7 Roadside Assistance SOS dispatch trigger, direct 1-800-VANGUARD voice hotline, direct WhatsApp concierge modal, priority advisory ticket submission with downloadable `.ics` calendar callback invite, and regional command centers (New York, London, Singapore). |
| [`dashboard.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/dashboard.html) | **Policyholder Command Console** | **Logged-in email prominently displayed at the very top bar telemetry ribbon (`LOGGED IN AS: [user-email]`)**, active vehicle policy showcase (Porsche Taycan 4S EV / BMW / Mercedes), 1-click Policy Certificate PDF download, live claim status tracker widget, telematics safe driver score widget, encrypted document vault (RC, License, PUC), and VIP persona switcher. |
| [`login.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/login.html) | **Policyholder Portal Authentication** | Any email & password flexible authentication, one-touch VIP demo personas (Alexander Wright, Elena Rostova, Marcus Vance), and simulated Biometric FaceID / Passkey laser scanner. |
| [`signup.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/signup.html) | **Driver Onboarding & Enrollment** | Instant account creation and vehicle policy linkage with registration plate, make, model, and automatic policy issuance. |
| [`404.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/404.html) | **GPS Off-Grid Error Page** | Radar pulse animation, lost telemetry warning, and quick routing shortcuts to all core sections. |

---

## 🌟 Key Features & Creative Implementations

1. **Real-Time 3D WebGL Vehicle Inspector (`js/three-car.js`):**
   - **Procedural PBR Materials:** Metallic automotive paint shader, aerodynamic roof canopy glass with transmission, carbon fiber trim, chrome exhaust and alloy rims.
   - **Holographic Safety Radar Cone:** Pulsating 3D cone projecting from the vehicle's front ADAS LiDAR sensor to visualize real-time collision prevention telemetry.
   - **High-Voltage EV Underbody Shield:** Emerald illuminated battery armor layer showcasing electric vehicle undercarriage protection.
   - **Interactive 360° Drag Orbit & Preset Cameras:** Full mouse/touch drag rotation with inertia, auto-rotation toggle, wireframe scanning mode, and 1-click cameras (Front ADAS, Side Chassis, Battery Shield, 360° Overview).
   - **5 Dynamic Paint Finishes:** Instant switching between Apex Cyan (`#00e5ff`), Midnight Obsidian (`#0f172a`), Crimson Velocity (`#ef4444`), Liquid Silver (`#e2e8f0`), and Electric Gold (`#f59e0b`).

2. **Precision Actuarial Quote Engine (`js/quote-engine.js`):**
   - Real actuarial calculations matching industry standard motor insurance formulas:
     - Own Damage (OD) calculated against vehicle age and engine class.
     - Insured Declared Value (IDV) slider with dynamic ±15% market value adjustment.
     - No Claim Bonus (NCB) tier selections (0%, 20%, 25%, 35%, 45%, 50%).
     - Modular add-on protectors: Zero Depreciation, Engine & Gearbox Hydro-Shield, 24/7 Roadside SOS, Smart Key Replacement, Consumables, Tyre & Alloy Safeguard, Return to Invoice, and EV High-Voltage Battery Shield.
     - Subtotal, GST 18%, Grand Total, and 12-month Flex-Pay EMI breakdowns.
     - Instant downloadable official quote document (`.txt`) and 60-second instant checkout modal.

3. **Express 30-Minute Claims & AI Damage Vision (`js/claims-engine.js`):**
   - **Interactive AI Damage Vision Simulator:** Choose between Front Bumper Impact, Rear Fender Collision, Acoustic Windshield Shatter, or Side Door Scrape. The engine displays an animated bounding box with confidence score, matched OEM part number, and instant cashless payout calculation.
   - **Live Claim Status Tracker:** Real-time search by Claim ID (e.g. `CLM-84920`, `CLM-71044`, `CLM-98241`) exhibiting an interactive 5-step milestone pipeline, assigned loss assessor details, and authorized workshop contact info.
   - **Cashless Garage Directory:** Searchable catalog of 10,800+ authorized OEM workshops with distance, ratings, badges, and 1-click priority slot booking.

4. **Telematics Smart Drive Sandbox (`services.html`):**
   - Live interactive sliders for smooth braking, speed compliance, cornering G-force, and daylight commuting.
   - Reactive SVG circular gauge calculating composite driver score (up to 100) and converting safe driving habits into immediate renewal cashbacks (up to 35% discount).

5. **Prominent Top-Bar Email & Telemetry in Dashboard (`dashboard.html`):**
   - Dedicated top-level telemetry ribbon exhibiting `LOGGED IN AS: [user-email]` with pulsating radar indicator.
   - Real-time UTC meridian clock synchronized across all pages.
   - Active vehicle policy card with 1-click downloadable Certificate of Motor Insurance.
   - Encrypted document vault with vehicle RC, driver's license, and emissions certificate tracking.

6. **Crystalline Acoustic Sound Effects (`js/main.js`):**
   - Web Audio API synthesizer producing harmonic acoustic feedback upon button clicks, policy purchases, claim submissions, radar scans, and emergency SOS alerts.

7. **24/7 Priority Emergency SOS Dispatcher:**
   - Universal modal with automatic GPS location detection, vehicle plate autofill, assistance type selector, and live patrol arrival simulation with toll-free telephone integration.

---

## 📂 Project Directory Structure

```
Vehicle Insurance Platfor/
├── index.html                      # Homepage, Hero & 3D WebGL Vehicle Inspector
├── quote.html                      # Actuarial Premium Calculator & Policy Customizer
├── plans.html                      # 6 Core Coverage Blueprints & Comparison Matrix
├── claims.html                     # Express Claims Center, AI Damage Scan & Garages
├── services.html                   # 2-Min Renewal, Telematics Sandbox & Document Vault
├── about.html                      # Corporate Solvency (2.45x) & Underwriting Consortium
├── contact.html                    # 24/7 Roadside SOS Dispatch & Command Centers
├── dashboard.html                  # Policyholder Console with Prominent Email Header
├── login.html                      # Driver Portal Authentication & VIP Personas
├── signup.html                     # Driver Onboarding & Policy Registration
├── 404.html                        # GPS Off-Grid Error & Route Lost Page
├── package.json                    # Project metadata & npm scripts
├── README.md                       # Comprehensive Monograph & Documentation
├── css/
│   └── style.css                   # Cyber-automotive dark theme, glassmorphism, scrollbars
├── js/
│   ├── auth.js                     # Unified user session manager & persona switcher
│   ├── main.js                     # Lenis scroll, Web Audio haptics, telemetry clock & SOS
│   ├── quote-engine.js             # Actuarial motor insurance calculation engine
│   ├── claims-engine.js            # Claims submission, live pipeline tracker & garages
│   └── three-car.js                # Three.js 3D WebGL vehicle twin with scan & orbit
└── assets/
    └── images/
        ├── logo.svg                # Full Vanguard Auto brand emblem & typography
        ├── logo-icon.svg           # Hexagonal automotive shield vector icon
        └── favicon.svg             # High-resolution browser favicon
```

---

## 🚀 How to Run the Project

This platform is 100% self-contained and browser-native. It requires zero compilation or build tools:

1. **Direct Browser Open:** Simply double click [`index.html`](file:///c:/Users/91939/Documents/Vehicle%20Insurance%20Platfor/index.html) in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
2. **Local HTTP Server (Optional):**
   ```powershell
   npx serve .
   ```
   Or via Python:
   ```powershell
   python -m http.server 8080
   ```
