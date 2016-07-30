var foo = require('./foo.js');
var bar = require('./bar.js');
var gamma = require('koa');

var x = foo(12) + bar('barz');
alert(x);