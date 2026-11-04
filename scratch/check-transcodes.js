const https = require('https');

const tests = [
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/aa/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm.1080p.vp9.webm',
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/aa/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm.720p.vp9.webm',
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/aa/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm.480p.vp9.webm',
  'https://upload.wikimedia.org/wikipedia/commons/a/aa/Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm'
];

tests.forEach(u => {
  const req = https.request(u, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(`${res.statusCode} | Length: ${res.headers['content-length']} | ${u}`);
  });
  req.on('error', e => console.error(e.message));
  req.end();
});
