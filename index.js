var exec = require('child_process').exec;

var create = function() {
  return new gs();
};

var gs = function() {
  this.options = [];
  this._input = null;
};

gs.prototype.batch = function() {
  this.options.push('-dBATCH');
  return this;
};

gs.prototype.device = function(device) {
  device = device || 'jpeg';
  this.options.push('-sDEVICE=' + device);
  return this;
};

gs.prototype.exec = function(callback) {
  var self = this;

  if (!this._input) return callback("Please specify input");

  var args = this.options.concat([this._input]).join(' ');
  exec('gs ' + args, function(err, stdout, stderr) {
    callback(err, stdout, stderr);
  });
};

gs.prototype.input = function(file) {
  this._input = file;
  return this;
};

gs.prototype.nopause = function() {
  this.options.push('-dNOPAUSE');
  return this;
};

gs.prototype.output = function(file) {
  file = file || '-';
  this.options.push('-sOutputFile=' + file);
  if (file === '-') return this.quiet();
  return this;
};

gs.prototype.q = gs.prototype.quiet;

gs.prototype.quiet = function() {
  this.options.push('-dQUIET');
  return this;
};

module.exports = create;
