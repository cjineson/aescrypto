'use strict';
var aescrypto = require('./aescrypto');
var fs = require('fs');

var text = fs.readFileSync('infile').toString();
console.log('Original :',text);
var encdata = aescrypto.encrypt(text);
console.log('Encrypted:',encdata);
var decdata = aescrypto.decrypt(encdata);
console.log('Decrypted:',decdata);


