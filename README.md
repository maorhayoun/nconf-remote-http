nconf-remote-http
======================

[![Build Status](https://travis-ci.org/maorhayoun/nconf-remote-http.svg?branch=master)](https://travis-ci.org/maorhayoun/nconf-remote-http)

storage engine extention for serving json configuration files via http/s 

## Install

```sh
$ npm install nconf-remote-http --save
```

## Setup
In order to setup and use `nconf-remote-http` consider the following example script. It initializes nconf with http storage engine which accepts url and callback function which exposes the json content.
Additional config retrievals can be done via `nconf.get` accessor method.

### asynchronous mode
```js
var nconf = require('nconf');
require('nconf-remote-http');

nconf.use('http', { url: 'http://jsonplaceholder.typicode.com/posts/1',
  callback: function (data) {
    console.log(nconf.get('title'));
  }
});
```

### Synchronous mode
This flow relies on [sync-request](https://github.com/ForbesLindesay/sync-request) which spawns a worker process in order to make
the http request synchronous. consider using it for service initialization flow. either way, **use with caution**.

```js
nconf.use('http', { url: 'http://jsonplaceholder.typicode.com/posts/1' });
console.log(nconf.get('title'))
```
