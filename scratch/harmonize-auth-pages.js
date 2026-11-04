const fs = require('fs');

['login.html', 'signup.html', '404.html'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/selection:bg-cyan-400 selection:text-slate-950/g, 'selection:bg-red-500 selection:text-white');
  html = html.replace(/text-cyan-400/g, 'text-red-400');
  html = html.replace(/border-cyan-500\/30/g, 'border-red-500/40');
  html = html.replace(/focus:border-cyan-400/g, 'focus:border-red-500');
  html = html.replace(/btn-cyan-glow/g, 'btn-pill-red');
  fs.writeFileSync(file, html, 'utf8');
  console.log(`[Harmonized] ${file}`);
});

