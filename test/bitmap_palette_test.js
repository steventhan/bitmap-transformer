'use strict';

const bitmap = require('../lib/bitmap_pallate');
const expect = require('chai').expect;

describe('get the size of the bitmap file', () => {
  it('is checking the JS object', () => {
    expect(bitmap.isABuffer).to.eql(true);
    expect(bitmap.identify).to.eql('BM');
    expect(bitmap.bmpSize).to.eql(11078);
    expect(bitmap.pixelArrayStartLoc).to.eql(1078);
  });
  it('is checking to make sure it is a function', () =>{
    expect(bitmap.transformPalletteBitmap).to.be.a('function');
  });
  it('making sure the image was altered', () =>{
    expect('../palette-bitmap.bmp').to.not.eql('../converted.bmp');
  });
});
