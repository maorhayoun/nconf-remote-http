var nconf = require('nconf');
var should = require('chai').should();
var nock = require('nock');
require('../lib/nconf-remote-http');

describe('nconf use()', function () {
  it('should not throw error when using etcd', function (done) {
    nock('http://example')
      .get('/config.json')
      .reply(200, { 'connection-string': 'Data Source=mydb'});
      
    nconf.use('http', 
      { 
        url: 'http://example/config.json',
        callback: (data) => {
          console.log(data);
          console.log(nconf.get('connection-string'));
          nconf.get('connection-string').should.equal('Data Source=mydb')
          done();
        }
      });

  });
});
