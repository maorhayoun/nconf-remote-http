'use strict';

var nconf = require('nconf');
var util = require('util');
var https = require('https');
var http = require('http');
var url = require('url');

var Http = exports.Http = function(options) {
  this.type = 'http';
  this.readOnly = true;
  this.url = options.url;
  this.callback = options.callback;
}

Http.prototype.loadSync = function () { 
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
        var parsed = JSON.parse(body);
        this.store = parsed;
        return this.callback(parsed);
    });
    res.on('error', (e) => {
      console.error(e);
    });
  });
}

util.inherits(Http, nconf.Memory);
    
Http.prototype.get = function (key) {
  return this.store[key];
}
    
module.exports = Http;
nconf.Http = Http;