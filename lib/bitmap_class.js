'use strict';

const fs = require('fs');

var BitmapFile = function(buffer, transformMode) {
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
  this.transformMode = transformMode;
};

BitmapFile.prototype.getHeaderInfo = function() {
  // Get header info from buffer
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
  console.log('bufferlength:', this.buffer.length);
};

BitmapFile.prototype.transform = function() {
  // Check if bmp file has color palette or not in order to call the correct function.
  (this.hasColorPalette) ? this.transformPaletteBitmap() : this.transformNonPaletteBitmap();
};

BitmapFile.prototype.transformNonPaletteBitmap = function() {
  // Check if each row has padding pixels. This only applies if the file has the row size not divisible by 4.
  let paddingPixels  = [];
  if ((this.width * 3) % 4 !== 0) {
    for (let i = 1; i <= this.height; i++) {
      if ((this.width * 3) % 4 === 3) {
        paddingPixels.push(
          (i * (this.width * 3) + (this.width * 3) % 4) + (this.pixelArrayStartingAddress - 1),
          (i * (this.width * 3) + (this.width * 3) % 4) + (this.pixelArrayStartingAddress - 1) - 1,
          (i * (this.width * 3) + (this.width * 3) % 4) + (this.pixelArrayStartingAddress - 1) - 2
        );
      } else if ((this.width * 3) % 4 === 2) {
        paddingPixels.push(
          (i * (this.width * 3) + (this.width * 3) % 4) + (this.pixelArrayStartingAddress - 1),
          (i * (this.width * 3) + (this.width * 3) % 4) + (this.pixelArrayStartingAddress - 1) - 1
        );
      } else if ((this.width * 3) % 4 === 1) {
        paddingPixels.push(
          (i * (this.width * 3) + (this.width * 3) % 4) + (this.pixelArrayStartingAddress - 1)
        );
      }
    }
  }

  // Switch statement for different transform mode
  switch (this.transformMode) {
    case 'invert':
      for (let i = this.pixelArrayStartingAddress; i < this.buffer.length; i++) {
        this.buffer[i] = 255 - this.buffer[i];
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'grayscale':
      for (let i = this.pixelArrayStartingAddress; i < this.buffer.length; i += 3) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'bluescale':
      for (let i = this.pixelArrayStartingAddress; i < this.buffer.length; i += 3) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average + 50;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'greenscale':
      for (let i = this.pixelArrayStartingAddress; i < this.buffer.length; i += 3) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average;
        this.buffer[i + 1] = average + 50;
        this.buffer[i + 2] = average;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    // Redscale mode is currently used to test for non-palette bmp file with padding, still not working yet
    case 'redscale':
      for (let i = this.pixelArrayStartingAddress; i < this.buffer.length; i += 3) {
        if (paddingPixels.indexOf(i) !== -1) {
          let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
          this.buffer[i] = average;
          this.buffer[i + 1] = average;
          this.buffer[i + 2] = average + 50;
        }
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    default:
      console.log('Unknown transform option, please specify');
      break;
  }
};

BitmapFile.prototype.transformPaletteBitmap = function() {
  switch (this.transformMode) {
    case 'invert':
      for(let i = 54; i <= this.pixelArrayStartingAddress; i++) {
        this.buffer[i] = 255 - this.buffer[i];
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'grayscale':
      for(let i = 54; i <= this.pixelArrayStartingAddress; i += 4) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'bluescale':
      for (let i = 54; i < this.pixelArrayStartingAddress; i += 4) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average + 50;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'greenscale':
      for (let i = 54; i < this.pixelArrayStartingAddress; i += 4) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average;
        this.buffer[i + 1] = average + 50;
        this.buffer[i + 2] = average;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    case 'redscale':
      for (let i = 54; i < this.pixelArrayStartingAddress; i += 4) {
        let average = (this.buffer[i] + this.buffer[i + 1] + this.buffer[i + 2])/3;
        this.buffer[i] = average;
        this.buffer[i + 1] = average;
        this.buffer[i + 2] = average  + 50;
      }
      this.saveTransformedFileToDisk(this.transformMode);
      break;

    default:
      console.log('Unknown transform option, please specify');
  }
};

BitmapFile.prototype.saveTransformedFileToDisk = function(mode) {
  fs.writeFile(`${mode}-${process.argv[2].split('/').pop()}`, this.buffer, (err) => {
    if (err) console.log(err);
  });
};

module.exports = BitmapFile;
