const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAX_BYTES = 100 * 1024; // 102,400 bytes (100KB)
const TARGET_MAX_BYTES = 95 * 1024; // 97,280 bytes target for safety margin

function getFiles(dir, extensions = ['.jpg', '.jpeg', '.png']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, extensions));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function convertToWebp(inputFile) {
  const parsed = path.parse(inputFile);
  const outputFile = path.join(parsed.dir, parsed.name + '.webp');
  const origSize = fs.statSync(inputFile).size;

  const isPng = parsed.ext.toLowerCase() === '.png';

  // Strategy ladder for quality and dimension scaling
  const attempts = [
    { quality: 85, maxW: 1600 },
    { quality: 80, maxW: 1400 },
    { quality: 75, maxW: 1280 },
    { quality: 70, maxW: 1200 },
    { quality: 65, maxW: 1100 },
    { quality: 60, maxW: 1000 },
    { quality: 55, maxW: 900 },
    { quality: 50, maxW: 800 },
    { quality: 40, maxW: 700 }
  ];

  let bestSize = Infinity;
  let success = false;

  for (const { quality, maxW } of attempts) {
    try {
      let vf = `scale='min(${maxW},iw)':-2`;
      let cmd = '';

      if (isPng) {
        // Keep alpha channel for PNGs
        cmd = `ffmpeg -y -i "${inputFile}" -vf "${vf}" -c:v libwebp -quality ${quality} "${outputFile}"`;
      } else {
        cmd = `ffmpeg -y -i "${inputFile}" -vf "${vf}" -c:v libwebp -quality ${quality} "${outputFile}"`;
      }

      execSync(cmd, { stdio: 'pipe' });

      if (fs.existsSync(outputFile)) {
        const outSize = fs.statSync(outputFile).size;
        bestSize = outSize;
        if (outSize <= TARGET_MAX_BYTES) {
          success = true;
          break;
        }
      }
    } catch (err) {
      // Continue to next attempt
    }
  }

  // If still over target, try a final aggressive scale down
  if (bestSize > MAX_BYTES) {
    try {
      const cmd = `ffmpeg -y -i "${inputFile}" -vf "scale='min(640,iw)':-2" -c:v libwebp -quality 40 "${outputFile}"`;
      execSync(cmd, { stdio: 'pipe' });
      bestSize = fs.statSync(outputFile).size;
      success = bestSize <= MAX_BYTES;
    } catch (e) {}
  }

  const finalSize = fs.existsSync(outputFile) ? fs.statSync(outputFile).size : -1;
  const reduction = finalSize > 0 ? (((origSize - finalSize) / origSize) * 100).toFixed(1) : 0;

  return {
    input: inputFile,
    output: outputFile,
    origSize,
    finalSize,
    reduction,
    under100kb: finalSize > 0 && finalSize <= MAX_BYTES
  };
}

const targetDirs = [
  path.join(__dirname, 'assets', 'images'),
  path.join(__dirname, 'assets', 'videos')
];

let allImages = [];
for (const dir of targetDirs) {
  allImages = allImages.concat(getFiles(dir));
}

console.log(`Found ${allImages.length} images to convert to WebP under 100KB.\n`);

const results = [];
let allUnder100kb = true;

for (const img of allImages) {
  const res = convertToWebp(img);
  results.push(res);
  const status = res.under100kb ? '✓ OK' : '✗ OVER LIMIT';
  if (!res.under100kb) allUnder100kb = false;
  console.log(`${status} | ${(res.finalSize / 1024).toFixed(1)} KB (orig ${(res.origSize / 1024).toFixed(1)} KB, -${res.reduction}%) -> ${path.relative(__dirname, res.output)}`);
}

console.log(`\n========================================`);
console.log(`SUMMARY: ${results.length} images converted to WebP.`);
console.log(`ALL UNDER 100KB: ${allUnder100kb ? 'YES! 100% VERIFIED' : 'NO'}`);
console.log(`========================================`);

