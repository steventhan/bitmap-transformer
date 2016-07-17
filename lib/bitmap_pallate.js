const fs = require('fs');

var bitmapPalette = fs.readFileSync(__dirname + '/../palette-bitmap.bmp');
// console.log(bitmapPalette);

function BitmapFile (buffer) {
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

BitmapFile.prototype.transformPalletteBitmap = function(){
  for(var i = (this.pixelArrayStartLoc + 1); i < ( this.numColors * this.colorDeep); i += 4) {
    console.log(this.buffer[i]);
    this.buffer[i] = 255 - this.buffer[i];      this.buffer[i + 1] = 255 - this.buffer[i];
    this.buffer[i + 2] = 255 - this.buffer[i];
    this.buffer[i + 3] = 255 - this.buffer[i];
  }
  fs.writeFile('')
};

var bitmap = new BitmapFile(bitmapPalette);

module.exports = bitmap;
debugger;
