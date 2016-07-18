'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const BitmapFile = require('../lib/bitmap_class');

describe('the BitmapFile class', () => {
  var nonPaletteBMBuffer,
    nonPaletteBMFile,
    paletteBMBuffer,
    paletteBMFile;

  var processArgvBackup = process.argv;
  var nonPaletteFilePath = '/../non-palette-bitmap.bmp';
  var paletteFilePath = '/../palette-bitmap.bmp';

  describe('the transformNonPaletteBitmap class method', () => {
    beforeEach((done) => {
      process.argv = [null, null, nonPaletteFilePath];
      fs.readFile(__dirname + nonPaletteFilePath, (err, data) => {
        if (err) console.log(err);
        nonPaletteBMBuffer = data;
        done();
      });
    });

    after((done) => {
      // Reverse process.argv
      process.argv = processArgvBackup;
      // Clean up test file
      fs.unlink(__dirname + '/../invert-non-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../grayscale-non-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../bluescale-non-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../greenscale-non-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../redscale-non-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
        done();
      });
    });

    it('should invert the color', (done) => {
      var mode = 'invert';
      nonPaletteBMFile = new BitmapFile(nonPaletteBMBuffer, mode);
      nonPaletteBMFile.transformNonPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-non-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should grayscale the color', (done) => {
      var mode = 'grayscale';
      nonPaletteBMFile = new BitmapFile(nonPaletteBMBuffer, mode);
      nonPaletteBMFile.transformNonPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-non-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should bluescale the color', (done) => {
      var mode = 'grayscale';
      nonPaletteBMFile = new BitmapFile(nonPaletteBMBuffer, mode);
      nonPaletteBMFile.transformNonPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-non-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should greenscale the color', (done) => {
      var mode = 'greenscale';
      nonPaletteBMFile = new BitmapFile(nonPaletteBMBuffer, mode);
      nonPaletteBMFile.transformNonPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-non-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should redscale the color', (done) => {
      var mode = 'redscale';
      nonPaletteBMFile = new BitmapFile(nonPaletteBMBuffer, mode);
      nonPaletteBMFile.transformNonPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-non-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });
  });

  describe('the transformPaletteBitmap class method', () => {
    beforeEach((done) => {
      process.argv = [null, null, paletteFilePath];
      fs.readFile(__dirname + paletteFilePath, (err, data) => {
        if (err) console.log(err);
        paletteBMBuffer = data;
        done();
      });
    });

    after((done) => {
      // Reverse process.argv
      process.argv = processArgvBackup;
      // Clean up test file
      fs.unlink(__dirname + '/../invert-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../grayscale-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../bluescale-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../greenscale-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
      });
      fs.unlink(__dirname + '/../redscale-palette-bitmap.bmp', (err) => {
        if (err) console.log(err);
        done();
      });
    });

    it('should invert the color', (done) => {
      var mode = 'invert';
      paletteBMFile = new BitmapFile(paletteBMBuffer, mode);
      paletteBMFile.transformPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should grayscale the color', (done) => {
      var mode = 'grayscale';
      paletteBMFile = new BitmapFile(paletteBMBuffer, mode);
      paletteBMFile.transformPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should bluescale the color', (done) => {
      var mode = 'bluescale';
      paletteBMFile = new BitmapFile(paletteBMBuffer, mode);
      paletteBMFile.transformPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should greenscale the color', (done) => {
      var mode = 'greenscale';
      paletteBMFile = new BitmapFile(paletteBMBuffer, mode);
      paletteBMFile.transformPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });

    it('should redscale the color', (done) => {
      var mode = 'redscale';
      paletteBMFile = new BitmapFile(paletteBMBuffer, mode);
      paletteBMFile.transformPaletteBitmap();
      fs.readFile(__dirname + `/../${mode}-palette-bitmap.bmp`, (err, data) => {
        if (err) console.log(err);
        expect(data).to.be.ok;
        done();
      });
    });
  });
});
