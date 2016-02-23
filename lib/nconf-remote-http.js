'use strict';

var nconf = require('nconf');
var util = require('util');
var https = require('https');
var http = require('http');
var url = require('url');
var request = require('sync-request');

var Http = exports.Http = function(options) {
  this.type = 'http';
  this.readOnly = true;
  this.url = options.url;
  this.callback = options.callback;
}

Http.prototype.loadSync = function () { 
  if (this.callback) return this.load(this.callback);
  
  // request file synchronously
  try {
    var res = request('GET', this.url, {
      json: true
    });
    if (res) {
      this.store = JSON.parse(res.body);
    }
  } catch (err) {
    console.log(err);
    this.store = {};
  }
  return this.store;

}

Http.prototype.load = function (callback) {
  var urlparts = url.parse(this.url);
  var request = urlparts.protocol.indexOf('https') != -1 ? https : http;
  var reqOptions = {
    method: 'GET',
    host: urlparts.hostname,
    port: urlparts.port,
    path: urlparts.path,
    headers: { 'Content-Type': 'application/json' }
  };
    
  var body = '';
  request.get(reqOptions, (res) => {
    res.on('data', function (d) {
      body += d;
    });
    res.on('end', () => {
        this.store = JSON.parse(body);
        return callback(this.store);
    });
    res.on('error', (e) => {
      console.error(e);
      callback(e);
    });
  });
}

util.inherits(Http, nconf.Memory);
    
Http.prototype.get = function (key) {
  return this.store[key];
}
    
module.exports = Http;
nconf.Http = Http;