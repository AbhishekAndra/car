const https = require('https');

const options = {
  hostname: 'www.pexels.com',
  path: '/search/videos/red%20ferrari/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  }
};

https.get(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const videoMatches = body.match(/https:\/\/videos\.pexels\.com\/video-files\/[0-9]+\/[^"'\s]+/g);
    if (videoMatches) {
      console.log('Found video URLs:', [...new Set(videoMatches)].slice(0, 10));
    } else {
      console.log('No direct video URLs found in HTML, checking data-src or video ids');
      const ids = body.match(/\/video\/[0-9]+/g);
      if (ids) console.log('Video IDs:', [...new Set(ids)].slice(0, 10));
    }
  });
}).on('error', e => console.error(e));
