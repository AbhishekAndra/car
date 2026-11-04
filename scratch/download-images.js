const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGES_TO_FETCH = [
  {
    name: 'ferrari-sf90.jpg',
    url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'ferrari-engine.jpg',
    url: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'ferrari-cockpit-carbon.jpg',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'ferrari-track-racing.jpg',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'supercar-workshop-bay.jpg',
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'luxury-transporter.jpg',
    url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'ferrari-roma-sunset.jpg',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'client-vip-1.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'client-vip-2.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'client-vip-3.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(__dirname, '..', 'assets', 'images', item.name);
    const file = fs.createWriteStream(dest);

    https.get(item.url, (response) => {
      // Handle redirects if any
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
            resolve();
          });
        }).on('error', (err) => {
          console.error(`Error redirect ${item.name}:`, err.message);
          resolve();
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${item.name}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const img of IMAGES_TO_FETCH) {
    await download(img);
  }
  console.log('All images downloaded successfully!');
}

run();

