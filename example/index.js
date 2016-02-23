var nconf = require('nconf');
require('../lib/nconf-remote-http');

nconf.use('http', { url: 'http://jsonplaceholder.typicode.com/posts/1',
  callback: function (data) {
    console.log(nconf.get('title'));
  }
});

