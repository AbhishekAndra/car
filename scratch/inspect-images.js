const fs = require('fs');

function getJpegDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const mockupPath = 'C:\\Users\\91939\\.gemini\\antigravity\\brain\\76b29709-8c51-49b4-acd1-71813d935b0b\\.user_uploaded\\media_1793254555774_bdd669e6.jpg';
console.log('Mockup:', getJpegDimensions(mockupPath));
console.log('hero-red-ferrari:', getJpegDimensions('assets/images/hero-red-ferrari.jpg'));
console.log('ferrari-pista:', getJpegDimensions('assets/images/ferrari-pista.jpg'));

