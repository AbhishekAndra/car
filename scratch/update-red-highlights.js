const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace gold drop shadow with red drop shadow on logo
  content = content.replace(/drop-shadow-\[0_2px_12px_rgba\(250,204,21,0\.2\)\]/g, 'drop-shadow-[0_2px_16px_rgba(239,68,68,0.45)]');

  // Replace yellow highlights in mobile menu with red highlights
  content = content.replace(/text-yellow-400 font-bold/g, 'text-red-500 font-bold');
  content = content.replace(/hover:text-yellow-400/g, 'hover:text-red-400');
  content = content.replace(/text-yellow-400/g, 'text-red-400');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated red highlights in ${file}`);
  }
});

