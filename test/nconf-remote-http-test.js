var nconf = require('nconf');
var should = require('chai').should();
var nock = require('nock');
require('../lib/nconf-remote-http');

describe('nconf use()', function () {
  it('should load json configuration', function (done) {
    nock('http://example')
      .get('/config.json')
      .reply(200, { 'connection-string': 'Data Source=mydb'});
      
     nconf.use('http', 
      { 
        url: 'http://example/config.json',
        callback: (data) => {
          nconf.get('connection-string').should.equal('Data Source=mydb');
          done();
        }
      });
      done();

  });
});
