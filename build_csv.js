const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/data/raw_full_medicines.csv');

// We will write the lines
console.log('Writing to', targetPath);
