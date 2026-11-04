const { execSync } = require('child_process');

for (let s = 24; s <= 42; s += 2) {
  const pad = String(s).padStart(2, '0');
  try {
    execSync(`ffmpeg -ss 00:00:${pad} -i assets/videos/ferrari-spider.mp4 -frames:v 1 -q:v 2 assets/videos/frames/action-${pad}s.jpg -y`);
    console.log(`Action frame at ${pad}s`);
  } catch(e) {
    console.error(e.message);
  }
}
