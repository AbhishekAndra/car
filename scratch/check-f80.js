const crypto = require('crypto');
const filename = '2025-08-15_Monterey_Ferrari_F80.webm';
const md5 = crypto.createHash('md5').update(filename).digest('hex');
const url = `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${filename}`;
console.log('F80 URL:', url);
