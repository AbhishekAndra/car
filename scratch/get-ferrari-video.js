const https = require('https');

const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=File:Ferrari_F430_Spider_driving_as_viewed_from_FPV_drone.webm&prop=imageinfo&iiprop=url|size|mime&format=json';

https.get(url, { headers: { 'User-Agent': 'AntigravityFerrari/1.0 (contact@example.com)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch(e) {
      console.log(data);
    }
  });
}).on('error', err => console.error(err));
