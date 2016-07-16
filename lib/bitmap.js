'use strict';

const fs = require('fs');
var filePath = process.cwd() + '/' + process.argv[2];
console.log(process.cwd());
var bitmapFileBuffer = fs.readFileSync(filePath);
// debugger;

var BitmapFile = function(buffer) {
  this.identifier = buffer.toString('ascii',0, 2);
  this.fileSize = buffer.readIntLE(2, 4);
  this.pixelArrayStartingAddress = buffer.readIntLE(10, 4);
  this.hasColorPalette = (this.pixelArrayStartingAddress !== 54) ? true : false;
  this.typeHeaderSize = buffer.readIntLE(14, 4);
  this.totalHeaderSize = 14 + this.typeHeaderSize;
  this.width = buffer.readIntLE(18, 4);
  this.height = buffer.readIntLE(22, 4);
  this.numBitsPerPixel = buffer.readIntLE(28, 2);
  this.numColorInPalette = buffer.readIntLE(46, 4);
  this.pixelArray = buffer.slice(this.pixelArrayStartingAddress);
  this.buffer = buffer;
};

BitmapFile.prototype.getHeaderInfo = function() {
  console.log('identifier:', this.identifier);
  console.log('fileSize:', this.fileSize);
  console.log('pixelArrayStartingAddress:', this.pixelArrayStartingAddress);
  console.log('hasColorPalette:', this.hasColorPalette);
  console.log('typeHeaderSize:', this.typeHeaderSize);
  console.log('totalHeaderSize:', this.totalHeaderSize);
  console.log('width:', this.width);
  console.log('height:', this.height);
  console.log('numBitsPerPixel:', this.numBitsPerPixel);
  console.log('numColorInPalette:', this.numColorInPalette);
  console.log('pixelArray:', this.pixelArray.length);
};

BitmapFile.prototype.transform = function(mode) {
  (this.hasColorPalette) ? this.transformPaletteBitmap(mode): this.transformNonPaletteBitmap(mode);
};

BitmapFile.prototype.transformNonPaletteBitmap = function(mode) {
  if(mode !== undefined) {
    console.log('This bitmap file does not have a color palette. Transform this file using', mode);
    for (let i = this.pixelArrayStartingAddress; i <= this.pixelArray.length + 5; i++) {
      if(mode === 'invert') {
        this.buffer[i] = 255 - this.buffer[i];
      } else if (mode === 'grayscale') {
        var average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
      }
    }
    console.log('converted');
    fs.writeFile(`converted-${process.argv[2].split('/').pop()}`, this.buffer);
  } else {
    console.log('Unknown transform mode, please specify');
  }
};

BitmapFile.prototype.transformPaletteBitmap = function(mode) {
  console.log('This bitmap file has a color palette. This function does nothing for now. Transform this file using', mode);
};

BitmapFile.prototype.saveTransformedFileToDisk = function() {
  console.log('this method will save the transformed bitmap file to disk, it will do nothing for now');
};

var bitmapFile = new BitmapFile(bitmapFileBuffer);
bitmapFile.getHeaderInfo();
bitmapFile.transform(process.argv[3]);
