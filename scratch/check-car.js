const fs = require('fs');

// Simple script to read pixels or check if there's any tool
console.log('Inspecting hero-red-ferrari.jpg');
const buf = fs.readFileSync('assets/images/hero-red-ferrari.jpg');
console.log('Byte length:', buf.length);

