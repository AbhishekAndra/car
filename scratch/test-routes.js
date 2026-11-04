const http = require('http');

const routes = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/plans.html',
  '/quote.html',
  '/claims.html',
  '/contact.html',
  '/dashboard.html',
  '/login.html',
  '/signup.html',
  '/assets/images/logo.png',
  '/assets/images/logo-icon.png',
  '/assets/images/ferrari-sf90.jpg',
  '/assets/images/ferrari-engine.jpg',
  '/assets/images/ferrari-cockpit-carbon.jpg',
  '/assets/images/ferrari-track-racing.jpg',
  '/assets/images/supercar-workshop-bay.jpg',
  '/assets/images/luxury-transporter.jpg',
  '/assets/images/client-vip-1.jpg',
  '/assets/images/client-vip-2.jpg',
  '/assets/images/client-vip-3.jpg'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      resolve({ route, statusCode: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing HTTP endpoints on http://localhost:3000:');
  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.statusCode === 200) {
      console.log(`[OK 200] ${r} (${res.contentType})`);
    } else {
      console.error(`[FAIL] ${r} -> Status: ${res.statusCode || res.error}`);
    }
  }
}

run();

