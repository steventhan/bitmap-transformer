const fs = require('fs');

var bitmapPalette = fs.readFileSync(__dirname + '/../palette-bitmap.bmp');
// console.log(bitmapPalette);

function BitmapFile(buffer) {
  this.buffer = buffer;
  this.isABuffer = Buffer.isBuffer(buffer);
  //getting file common header data 14bytes
  this.identify = buffer.toString('ascii', 0, 2);
  this.bmpSize = buffer.readUInt32LE(2);
  this.pixelArrayStartLoc = buffer.readUInt32LE(10);
  //info for DIM header 40 bytes (54 bytes total for header)
  this.headerSize = buffer.readUInt32LE(14);
  this.pixelWidth = buffer.readUInt32LE(18);
  this.pixelHeidht = buffer.readUInt32LE(22);
  this.colorDeep = buffer.readUInt16LE(28);
  this.numColors = buffer.readUInt32LE(46);
  this.imgSize = buffer.readUInt32LE(34);
  this.hasColorPalette = (this.pixelArrayStartLoc === 1078) ? true : false;
  this.pixelArray = buffer.slice(this.pixelArrayStartLoc);
}

BitmapFile.prototype.transformPalletteBitmap = function(mode){
  if(mode === 'invert') {
    for(var i = (54); i <= this.pixelArrayStartLoc; i++) {
      console.log(this.buffer[i]);
      this.buffer[i] = 255 - this.buffer[i];
      console.log(this.buffer[i]);
    }
    console.log(this.buffer);
    fs.writeFileSync('converted.bmp', this.buffer);
  } else if (mode === 'greyscale'){
    for(var i = 54; i <= this.pixelArrayStartLoc; i += 4) {
      console.log(this.buffer[i]);
        var average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2] + this.buffer[i + 3])/4;
        this.buffer[i] = average;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
        this.buffer[i + 3] = average;
        console.log(this.buffer[i]);
      }
    fs.writeFileSync('converted.bmp', this.buffer);
  } else if(mode === 'blue') {
    for (var i = 54; i < this.pixelArrayStartLoc; i += 4) {
        var average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2] + this.buffer[i+3])/4;
        this.buffer[i] = average + 50;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
        this.buffer[i+3] = average;
    }
    fs.writeFileSync('converted.bmp', this.buffer);
  } else if(mode === 'green') {
    for (var i = 54; i < this.pixelArrayStartLoc; i += 4) {
        var average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2] + this.buffer[i+3])/4;
        this.buffer[i] = average;
        this.buffer[i + 1] = average + 50;
        this.buffer[i + 2] = average;
        this.buffer[i+3] = average;
    }
    fs.writeFileSync('converted.bmp', this.buffer);
  } else if(mode === 'red') {
    for (var i = 54; i < this.pixelArrayStartLoc; i += 4) {
        var average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2] + this.buffer[i+3])/4;
        this.buffer[i] = average;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average + 50;
        this.buffer[i+3] = average;
    }
    fs.writeFileSync('converted.bmp', this.buffer);
  }
};

var bitmap = new BitmapFile(bitmapPalette);

module.exports = bitmap;
debugger;

// This is so it fits into Stevens Code. I matched the file names and other calls so we can migrate this function into his file
//
// BitmapFile.prototype.transformPaletteBitmap = function(mode) {
//   if(mode === 'invert') {
//     for(var i = (55); i <= this.pixelArrayStartingAddress; i++) {
//       this.buffer[i] = 255 - this.buffer[i];
//     }
//     this.savedTransformedFileToDisk(mode);
//   }
// };
