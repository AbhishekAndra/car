const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const targetExts = ['.html', '.js', '.css'];

function getProjectFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scratch') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getProjectFiles(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (targetExts.includes(ext) && entry.name !== 'update-image-references.js' && entry.name !== 'convert-images-to-webp.js') {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// Map each image file that has a corresponding .webp file
const imageExtensions = ['.jpg', '.jpeg', '.png'];
const imagesDir = path.join(projectDir, 'assets', 'images');
const videosDir = path.join(projectDir, 'assets', 'videos');

const replacements = [];

function checkAndAddReplacements(dir, relPrefix) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const base = path.parse(f).name;
      const webpFile = path.join(dir, base + '.webp');
      if (fs.existsSync(webpFile)) {
        const fromRef = `${relPrefix}/${f}`;
        const toRef = `${relPrefix}/${base}.webp`;
        replacements.push({ from: fromRef, to: toRef, fromFile: f, toFile: base + '.webp' });
      }
    }
  }
}

checkAndAddReplacements(imagesDir, 'assets/images');
checkAndAddReplacements(videosDir, 'assets/videos');

console.log(`Prepared ${replacements.length} image replacement rules.\n`);

const files = getProjectFiles(projectDir);
let totalReplacementsMade = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  for (const rule of replacements) {
    // Match forward slash
    const regex1 = new RegExp(rule.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches1 = (content.match(regex1) || []).length;
    if (matches1 > 0) {
      content = content.replace(regex1, rule.to);
      fileReplacements += matches1;
    }

    // Match backslash just in case
    const backslashFrom = rule.from.replace(/\//g, '\\\\');
    const regex2 = new RegExp(backslashFrom, 'g');
    const matches2 = (content.match(regex2) || []).length;
    if (matches2 > 0) {
      content = content.replace(regex2, rule.to.replace(/\//g, '\\'));
      fileReplacements += matches2;
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacementsMade += fileReplacements;
    console.log(`Updated ${path.relative(projectDir, filePath)}: ${fileReplacements} image references updated to WebP.`);
  }
}

console.log(`\n========================================`);
console.log(`Total image references updated to WebP: ${totalReplacementsMade}`);
console.log(`========================================`);

