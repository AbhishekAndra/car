const fs = require('fs');

const pages = [
  'index.html', 'about.html', 'services.html', 'plans.html',
  'quote.html', 'claims.html', 'contact.html', 'dashboard.html',
  'login.html', 'signup.html', '404.html'
];

pages.forEach(file => {
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const hasHeader = html.includes('<header');
    const hasMobileDrawer = html.includes('mobile-menu-drawer');
    const hasLogo = html.includes('assets/images/logo.png');
    const navMatch = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i);
    const navLinks = navMatch ? (navMatch[1].match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g) || []).map(a => a.replace(/<[^>]+>/g, '').trim()) : [];
    
    console.log(`${file}: Header=${hasHeader}, Drawer=${hasMobileDrawer}, LogoPng=${hasLogo}, NavCount=${navLinks.length}, Links=[${navLinks.join(', ')}]`);
  }
});

