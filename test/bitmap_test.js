'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const BitmapFile = require('../lib/bitmap_class');

describe('the BitmapFile class', () => {
  var nonPaletteBMBuffer,
    nonPaletteBMFile,
    paletteBMBuffer,
    paletteBMFile,
    testFileBuffer,
    testFile;

  var processArgvBackup = process.argv;
  var nonPaletteFilePath = '/../non-palette-bitmap.bmp';
  var paletteFilePath = '/../palette-bitmap.bmp';

  before((done) => {
    fs.readFile(__dirname + nonPaletteFilePath, (err, data) => {
      if (err) console.log(err);
      nonPaletteBMBuffer = data;
      done();
    });
  });

  describe('the transformNonPaletteBitmap class method', () => {
    before(() => {
      process.argv = [null, null, nonPaletteFilePath, 'invert'];
    });
    it('should invert the color', () => {
      nonPaletteBMFile = new BitmapFile(nonPaletteBMBuffer, 'invert');
      nonPaletteBMFile.transformNonPaletteBitmap();
    });
  });

  describe('the saveTransformedFileToDisk class method', () => {
    before(() => {
      process.argv = [null, null, nonPaletteFilePath];
    });

    after((done) => {
      // Reverse process.argv
      process.argv = processArgvBackup;
      // Clean up test file
      fs.unlink(__dirname + '/../test-non-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
        done();
      });
    });

    it('should output new converted file with transform mode prepended before the original file name', (done) => {
      testFile = new BitmapFile(nonPaletteBMBuffer);
      testFile.saveTransformedFileToDisk('test');
      fs.readFile(__dirname + '/../test-non-palette-bitmap.bmp', (err, data) => {
        if (err) console.log(err);
        testFileBuffer = data;
        expect(testFileBuffer).to.be.ok;
        done();
      });
    });
  });
});
