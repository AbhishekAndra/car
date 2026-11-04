const crypto = require('crypto');
const https = require('https');

const files = [
  '2025-08-15_Monterey_Ferrari_F80.webm',
  'Ferrari_458_Italia_at_speed.webm',
  'Ferrari_racing_at_circuit.webm',
  'Ferrari_driving_track.webm'
];

function getUrl(name) {
  const md5 = crypto.createHash('md5').update(name).digest('hex');
  return `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${name}`;
}

files.forEach(f => {
  const u = getUrl(f);
  const req = https.request(u, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    if (res.statusCode === 200) {
      console.log(`FOUND: ${res.statusCode} | ${u}`);
    }
  });
  req.on('error', () => {});
  req.end();
});
