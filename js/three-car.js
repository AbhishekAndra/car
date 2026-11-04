/**
 * Vanguard Motor Assure - Three.js WebGL 3D Vehicle Inspector
 * Real-time 3D Vehicle Twin with Wireframe Scan, Lighting Modes & 360° Orbit
 */

class CarVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.carGroup = null;
    this.wheels = [];
    this.radarCone = null;
    this.isWireframe = false;
    this.headlightsOn = true;
    this.isDragging = false;
    this.autoRotate = true;
    this.previousMousePosition = { x: 0, y: 0 };
    this.carPaintMaterial = null;
    this.lights = [];

    this.init();
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 480;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050508, 0.04);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(4.8, 2.2, 5.2);
    this.camera.lookAt(0, 0.3, 0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    this.setupLights();

    // 5. Build 3D Car Model
    this.buildCar();

    // 6. Ground Grid & Reflection Disc
    this.setupGround();

    // 7. Event Listeners
    this.bindEvents();

    // 8. Animation Loop
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    this.scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xef4444, 1.5);
    rimLight.position.set(-6, 4, -5);
    this.scene.add(rimLight);

    const underGlow = new THREE.PointLight(0xef4444, 2.2, 7);
    underGlow.position.set(0, -0.15, 0);
    this.scene.add(underGlow);
    this.underGlow = underGlow;
  }

  buildCar() {
    this.carGroup = new THREE.Group();

    // Paint Material (Ferrari Rosso Corsa Default)
    this.carPaintMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.85,
      roughness: 0.22,
      envMapIntensity: 1.2
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a1120,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.88
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.6,
      roughness: 0.4
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1
    });

    const ledHeadlightMat = new THREE.MeshBasicMaterial({
      color: 0xe0f7fa
    });

    const ledTaillightMat = new THREE.MeshBasicMaterial({
      color: 0xff0044
    });

    // 1. Lower Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(1.9, 0.45, 4.4);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, this.carPaintMaterial);
    lowerBody.position.y = 0.4;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    this.carGroup.add(lowerBody);

    // 2. Aerodynamic Cockpit & Roof Canopy
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.55, 2.2);
    const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
    cabin.position.set(0, 0.85, -0.1);
    this.carGroup.add(cabin);

    // Roof Top Slab
    const roofGeo = new THREE.BoxGeometry(1.42, 0.08, 1.8);
    const roof = new THREE.Mesh(roofGeo, this.carPaintMaterial);
    roof.position.set(0, 1.15, -0.1);
    this.carGroup.add(roof);

    // 3. Front Hood Slope
    const hoodGeo = new THREE.BufferGeometry();
    const hoodVertices = new Float32Array([
      -0.95, 0.62, 0.8,   0.95, 0.62, 0.8,   0.9, 0.35, 2.2,
      -0.95, 0.62, 0.8,   0.9, 0.35, 2.2,   -0.9, 0.35, 2.2
    ]);
    hoodGeo.setAttribute('position', new THREE.BufferAttribute(hoodVertices, 3));
    hoodGeo.computeVertexNormals();
    const hood = new THREE.Mesh(hoodGeo, this.carPaintMaterial);
    this.carGroup.add(hood);

    // 4. Rear Fastback Slope
    const rearGeo = new THREE.BufferGeometry();
    const rearVertices = new Float32Array([
      -0.75, 1.1, -1.0,   0.75, 1.1, -1.0,   0.9, 0.6, -2.15,
      -0.75, 1.1, -1.0,   0.9, 0.6, -2.15,  -0.9, 0.6, -2.15
    ]);
    rearGeo.setAttribute('position', new THREE.BufferAttribute(rearVertices, 3));
    rearGeo.computeVertexNormals();
    const rearFastback = new THREE.Mesh(rearGeo, this.carPaintMaterial);
    this.carGroup.add(rearFastback);

    // 5. Front Windshield Slope
    const windGeo = new THREE.BufferGeometry();
    const windVertices = new Float32Array([
      -0.74, 1.12, 0.8,   0.74, 1.12, 0.8,   0.92, 0.63, 1.25,
      -0.74, 1.12, 0.8,   0.92, 0.63, 1.25, -0.92, 0.63, 1.25
    ]);
    windGeo.setAttribute('position', new THREE.BufferAttribute(windVertices, 3));
    windGeo.computeVertexNormals();
    const windshield = new THREE.Mesh(windGeo, glassMaterial);
    this.carGroup.add(windshield);

    // 6. LED Headlights & Taillights
    const leftHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.2), ledHeadlightMat);
    leftHeadlight.position.set(-0.68, 0.48, 2.18);
    this.carGroup.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.2), ledHeadlightMat);
    rightHeadlight.position.set(0.68, 0.48, 2.18);
    this.carGroup.add(rightHeadlight);

    // Full-width Horizon Taillight Bar
    const rearLightBar = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.07, 0.1), ledTaillightMat);
    rearLightBar.position.set(0, 0.58, -2.2);
    this.carGroup.add(rearLightBar);

    // 7. Wheels & Alloy Rims
    const wheelPositions = [
      { x: -0.98, y: 0.32, z: 1.35 },
      { x: 0.98, y: 0.32, z: 1.35 },
      { x: -0.98, y: 0.32, z: -1.35 },
      { x: 0.98, y: 0.32, z: -1.35 }
    ];

    const tyreGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.25, 24);
    tyreGeo.rotateZ(Math.PI / 2);
    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.26, 16);
    rimGeo.rotateZ(Math.PI / 2);

    const rubberMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });

    wheelPositions.forEach(pos => {
      const wheelGroup = new THREE.Group();
      const tyre = new THREE.Mesh(tyreGeo, rubberMat);
      const rim = new THREE.Mesh(rimGeo, chromeMaterial);
      wheelGroup.add(tyre);
      wheelGroup.add(rim);
      wheelGroup.position.set(pos.x, pos.y, pos.z);
      this.carGroup.add(wheelGroup);
      this.wheels.push(wheelGroup);
    });

    // 8. Holographic Radar Shield Cone (Safety Telematics Indicator)
    const coneGeo = new THREE.ConeGeometry(2.4, 3.5, 32, 1, true);
    coneGeo.rotateX(-Math.PI / 2);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    this.radarCone = new THREE.Mesh(coneGeo, coneMat);
    this.radarCone.position.set(0, 0.5, 3.2);
    this.carGroup.add(this.radarCone);

    // 9. High-Voltage Underbody Battery Shield (EV Layer)
    const battGeo = new THREE.BoxGeometry(1.6, 0.1, 2.8);
    const battMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x064e3b,
      emissiveIntensity: 0.5
    });
    const batteryShield = new THREE.Mesh(battGeo, battMat);
    batteryShield.position.set(0, 0.18, 0);
    this.carGroup.add(batteryShield);

    this.scene.add(this.carGroup);
  }

  setupGround() {
    // Cyber Grid
    const gridHelper = new THREE.GridHelper(20, 24, 0xef4444, 0x2e1115);
    gridHelper.position.y = -0.01;
    this.scene.add(gridHelper);

    // Dark Reflective Ring
    const ringGeo = new THREE.RingGeometry(1.2, 5.5, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.01;
    this.scene.add(ring);
  }

  bindEvents() {
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.carGroup) return;

      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.carGroup.rotation.y += deltaX * 0.008;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoRotate = false;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || !this.carGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      this.carGroup.rotation.y += deltaX * 0.008;
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Resize
    window.addEventListener('resize', () => {
      if (!this.container || !this.camera || !this.renderer) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight || 480;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  setColor(hexColor) {
    if (this.carPaintMaterial) {
      this.carPaintMaterial.color.setHex(hexColor);
      if (this.underGlow) this.underGlow.color.setHex(hexColor);
    }
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    if (this.carPaintMaterial) {
      this.carPaintMaterial.wireframe = this.isWireframe;
    }
    return this.isWireframe;
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    return this.autoRotate;
  }

  setCameraView(view) {
    if (!this.camera) return;
    if (view === 'front') {
      gsap.to(this.camera.position, { x: 0, y: 1.4, z: 4.8, duration: 1.2, ease: 'power2.inOut' });
    } else if (view === 'side') {
      gsap.to(this.camera.position, { x: 5.2, y: 1.2, z: 0, duration: 1.2, ease: 'power2.inOut' });
    } else if (view === 'battery') {
      gsap.to(this.camera.position, { x: 3.2, y: -0.4, z: 3.2, duration: 1.2, ease: 'power2.inOut' });
    } else {
      // 360 overview
      gsap.to(this.camera.position, { x: 4.8, y: 2.2, z: 5.2, duration: 1.2, ease: 'power2.inOut' });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.autoRotate && this.carGroup && !this.isDragging) {
      this.carGroup.rotation.y += 0.005;
    }

    // Pulse radar shield
    if (this.radarCone) {
      const time = Date.now() * 0.003;
      this.radarCone.material.opacity = 0.15 + Math.sin(time) * 0.1;
      this.radarCone.scale.set(1 + Math.sin(time) * 0.05, 1, 1 + Math.sin(time) * 0.05);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

window.CarVisualizer = CarVisualizer;
