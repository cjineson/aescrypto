'use strict';

var aescrypto = require('./aescrypto');
var fs = require('fs');

process.stdin.on('data', function(data) {
	var encdata = aescrypto.encrypt(data.toString());
  	process.stdout.write(encdata);
});
