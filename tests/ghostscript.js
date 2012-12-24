var assert = require('assert'),
gs         = require('../index');

describe('ghostscript', function() {
  describe('#batch', function() {
    it('should set batch option', function(done) {
      assert.deepEqual(gs().batch().options, ['-dBATCH']);
      done();
    });
  });

  describe('#device', function() {
    it('should set device option with default', function(done) {
      assert.deepEqual(gs().device().options, ['-sDEVICE=jpeg']);
      done();
    });

    it('should set device option with value', function(done) {
      assert.deepEqual(gs().device('png').options, ['-sDEVICE=png']);
      done();
    });
  });

  describe('#exec', function() {
    it('should pass an error for no input', function(done) {
      gs()
        .batch()
        .nopause()
        .device()
        .output()
        .exec(function(err, stdout, stderr) {
          assert.ok(err);
          assert.ok(!this._input);
          assert.equal(err, 'Please specify input');
          done();
        });
    });

    it('should convert pdf to jpeg', function(done) {
      gs()
        .batch()
        .nopause()
        .device('jpeg')
        .output('./tests/pdfs/test-%d.jpg')
        .input('./tests/pdfs/test.pdf')
        .exec(function(err, stdout, stderr) {
          assert.ok(!err);
          done();
        });
    });
  });

  describe('#input', function() {
    it('should set input', function(done) {
      assert.deepEqual(gs().input('file')._input, 'file');
      done();
    });
  });

  describe('#jpegq', function() {
    it('should set jpeg quality option with default', function(done) {
      assert.deepEqual(gs().jpegq().options, ['-dJPEGQ=75']);
      done();
    });

    it('should set jpeg quality option with value', function(done) {
      assert.deepEqual(gs().jpegq(85).options, ['-dJPEGQ=85']);
      done();
    });
  });

  describe('#nopause', function() {
    it('should set nopause option', function(done) {
      assert.deepEqual(gs().nopause().options, ['-dNOPAUSE']);
      done();
    });
  });

  describe('#output', function() {
    it('s', function(done) {
      assert.deepEqual(gs().output().options, ['-sOutputFile=-', '-dQUIET']);
      done();
    });

    it('should set output option with value', function(done) {
      assert.deepEqual(gs().output('bacon').options, ['-sOutputFile=bacon']);
      done();
    });
  });

  describe('#quiet', function() {
    it('should set quiet option', function(done) {
      assert.deepEqual(gs().quiet().options, ['-dQUIET']);
      done();
    });
  });

  describe('#resolution', function() {
    it('should set device resolution', function(done) {
      assert.deepEqual(gs().res(144, 144).options, ['-r144x144']);
      done();
    });

    it('should set device resolution', function(done) {
      assert.deepEqual(gs().res(144).options, ['-r144']);
      done();
    });
  });
});

