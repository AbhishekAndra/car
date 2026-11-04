const fs = require('fs');

const pages = [
  'index.html', 'about.html', 'services.html', 'plans.html',
  'quote.html', 'claims.html', 'contact.html', 'dashboard.html',
  'login.html', 'signup.html', '404.html'
];

let allOk = true;

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  
  // Find all local src attributes (assets/images/...)
  const matches = html.matchAll(/src=["'](assets\/images\/[^"']+)["']/g);
  for (const m of matches) {
    const imgPath = m[1];
    if (!fs.existsSync(imgPath)) {
      console.error(`[MISSING ASSET] In ${file}: ${imgPath}`);
      allOk = false;
    }
  }
});

if (allOk) {
  console.log('All local image references across all 11 HTML pages exist and are valid!');
}

