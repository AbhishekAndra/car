const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('assets/videos/frames')) fs.mkdirSync('assets/videos/frames');
for (let s = 4; s <= 40; s += 4) {
  const pad = String(s).padStart(2, '0');
  try {
    execSync(`ffmpeg -ss 00:00:${pad} -i assets/videos/ferrari-spider.mp4 -frames:v 1 -q:v 2 assets/videos/frames/frame-${pad}s.jpg -y`);
    console.log(`Extracted frame at ${pad}s`);
  } catch(e) {
    console.error(`Error at ${pad}s:`, e.message);
  }
}
