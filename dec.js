'use strict';

var aescrypto = require('./aescrypto');
var fs = require('fs');

process.stdin.on('data', function(data) {;
	console.log(data.toString());
	var decdata = aescrypto.decrypt(data.toString());
  	process.stdout.write(decdata);
});