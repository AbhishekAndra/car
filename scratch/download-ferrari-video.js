const https = require('https');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/aa/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm.720p.vp9.webm';
const outputPath = path.join(__dirname, '..', 'assets', 'videos', 'ferrari-spider.webm');

console.log('Downloading Ferrari Spider video from:', videoUrl);
console.log('Output to:', outputPath);

const file = fs.createWriteStream(outputPath);

function download(url, redirectCount = 0) {
  if (redirectCount > 5) {
    console.error('Too many redirects');
    return;
  }

  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirecting to ${res.headers.location}`);
      download(res.headers.location, redirectCount + 1);
      return;
    }

    if (res.statusCode !== 200) {
      console.error(`Failed with status: ${res.statusCode}`);
      return;
    }

    const total = parseInt(res.headers['content-length'], 10);
    let downloaded = 0;
    let lastLog = 0;

    res.on('data', (chunk) => {
      downloaded += chunk.length;
      const now = Date.now();
      if (now - lastLog > 1000) {
        lastLog = now;
        const pct = total ? Math.round((downloaded / total) * 100) : '?';
        console.log(`Downloaded ${Math.round(downloaded / 1024)} KB (${pct}%)`);
      }
    });

    res.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        console.log(`Download completed successfully: ${outputPath} (${downloaded} bytes)`);
      });
    });
  }).on('error', (err) => {
    fs.unlink(outputPath, () => {});
    console.error('Download error:', err.message);
  });
}

download(videoUrl);
