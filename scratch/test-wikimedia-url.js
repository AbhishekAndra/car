const https = require('https');

// Wikimedia Commons has direct media files:
// Let's compute the hash for "Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm"
const crypto = require('crypto');
const filename = 'Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm';
const md5 = crypto.createHash('md5').update(filename).digest('hex');
const a = md5[0];
const b = md5.slice(0, 2);
const directUrl = `https://upload.wikimedia.org/wikipedia/commons/${a}/${b}/${filename}`;
console.log('Constructed Wikimedia direct URL:', directUrl);

const req = https.request(directUrl, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
  console.log('Content-Length:', res.headers['content-length']);
});
req.on('error', err => console.error(err));
req.end();
