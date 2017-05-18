'use strict';
//
// AES256 Encrypt data with random IV & decrypt with IV: prefix
//
const CONFIG_FILE = 'aescrypto.json';
const fs = require('fs');
const nconf = require('nconf');
var crypto = require('crypto');

// Setup nconf to use Env vars & config file in order
nconf.env().file({ file: CONFIG_FILE });
// Get Master password from nconf
var password = nconf.get('aespwd');
// Generate 256bit AES key from Master password
if(password) {
	var key = crypto.createHash('sha256').update(password).digest();
} else {
	throw new Error('Invalid Master password');
}

// Encrypt given data
// Return value prefixed with 16byte IV & ':' e.g.
// a7b09b7f41bb91569e78da5cacdf067b:9f0a03b5e2aa870f6425b01d402920cd
function encrypt(text) {
	let iv = crypto.randomBytes(16);
	let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt given data
// Data must be prefixed with 16byte IV & ':' e.g.
// a7b09b7f41bb91569e78da5cacdf067b:9f0a03b5e2aa870f6425b01d402920cd
function decrypt(text) {
	let textParts = text.split(':');
	let iv = new Buffer(textParts.shift(), 'hex');
	let encryptedText = new Buffer(textParts.join(':'), 'hex');
	let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

module.exports = { decrypt, encrypt };