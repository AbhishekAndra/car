const https = require('https');

const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Ferrari_videos&cmtype=file&cmlimit=50&format=json';

https.get(url, { headers: { 'User-Agent': 'StacklyApp/1.0 (info@stackly.dev)' } }, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const titles = json.query.categorymembers.map(m => m.title);
      console.log('Category files:', titles);
    } catch(e) {
      console.log(data);
    }
  });
}).on('error', e => console.error(e));
