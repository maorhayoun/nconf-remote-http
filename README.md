nconf-remote-http
======================

storage engine extention for serving json configuration files via http/s 

## Install

```sh
$ npm install nconf-remote-http --save
```

## Setup
In order to setup and use `nconf-remote-http` consider the following example script. It initializes nconf with http storage engine which accepts url and callback function which exposes the json content.
Additional config retrievals can be done via `nconf.get` accessor method.

```js
var nconf = require('nconf');
require('../lib/nconf-remote-http');

nconf.use('http', { url: 'http://jsonplaceholder.typicode.com/posts/1',
  callback: function (data) {
    console.log(nconf.get('title'));
  }
});
```
