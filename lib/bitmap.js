const fs = require('fs');

var bitmap = fs.readFileSync(__dirname + '/../palette-bitmap.bmp');
console.log(bitmap);
