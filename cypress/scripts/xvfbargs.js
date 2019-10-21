const fs = require('fs');

const xvfbFile = './cypress/scripts/xvfb.js';
const xvfbLib = './node_modules/cypress/lib/exec/xvfb.js';

var xvfbStream = fs.createWriteStream(xvfbLib);
xvfbStream.on('error', function(err) {
  console.log(err);
  process.exit(1);
});

var xvfbArgs = fs.readFileSync(xvfbFile);
xvfbStream.write(xvfbArgs);
xvfbStream.end();

console.log('\nAdded Xvfb screen arguments');
