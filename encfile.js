'use strict';

var aescrypto = require('./aescrypto');
var fs = require('fs');

if (!(process.argv[2]&&process.argv[3])){
    console.log('No input/output file(s)!');
    console.log('Usage: node enc [infile] [outfile]');
    process.exit(1);
}
var input = process.argv[2];
var output = process.argv[3];
var text = fs.readFileSync(input).toString();

var encdata = aescrypto.encrypt(text);

fs.writeFileSync(output,encdata);