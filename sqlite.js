/*
The MIT License (MIT)

Copyright (c) 2015 Jayr Alencar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

//Requeries
var fs = require('fs');
var crypto = require('crypto');

function sqlite () {}

// Variables
sqlite.prototype = require('sqlite-sync'); //inheriting from sqlite-sync.js
sqlite.prototype.buffer = null;
sqlite.prototype.file2 = null;
sqlite.prototype.password = 'clubeDosGeeks';
sqlite.prototype.algorithm = 'aes-256-ctr';
sqlite.prototype.algorithms = crypto.getCiphers();

/**
   * Buffer decryption
   *
   * @param {Object} buffer - Encrypted buffer
   * @return {Object} - Decrypted buffer
 */
sqlite.prototype.pvDecrypt = function(buffer){
  var decipher = crypto.createDecipher(this.algorithm,this.password)
  var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
  return dec;
}

/**
   * Buffer encryption
   *
   * @param {Object} buffer - buffer
   * @return {Object} - Encrypted buffer
 */
sqlite.prototype.pvEncrypt = function(buffer){
  var cipher = crypto.createCipher(this.algorithm,this.password)
  var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
  return crypted;
}

/**
   * Database connection
   *
   * @param {String} db - File directory+filename
   * @param {String} password 
   * @param {String} algorithm
   * @return {Object}
 */
sqlite.prototype.connect = function(db, password, algorithm){
	this.file2 = db;
	this.password = password || this.password;
	this.algorithm = algorithm || this.algorithm;
	var self = this;

	if(this.algorithms.indexOf(this.algorithm)==-1){
		throw "This algorithm is not supported";
	}

	if(fs.existsSync(db)){
		var file2 = fs.readFileSync(db);
		var file2buffer = this.pvDecrypt(file2);
		this.con(file2buffer);
	}else{
		this.con(1);
	}

	return this;	
}

/**
   * Write the file
   *
   * @param {Object} buffer - buffer from sqlite-sync
 */
sqlite.prototype.writer = function(buffer){
	var data = this.pvEncrypt(new Buffer(buffer, "utf-8"));
	var buffer = new Buffer(data);
	fs.writeFileSync(this.file2, buffer);
}

/**
   * File decryption
   *
   * @param {String} from - encrypted file way
   * @param {String} to - decrypted file way
   * @param {String} password 
   * @param {String} algorithm
   * @return {Object}
 */
sqlite.prototype.decrypt = function(from, to, password, algorithm){
	if(fs.existsSync(from)){
		this.algorithm = algorithm || this.algorithm;
		this.password = password || this.password;
		if(this.algorithms.indexOf(this.algorithm)==-1){
			throw "This algorithm is not supported";
		}
		var file2 = fs.readFileSync(from);
		var data = this.pvDecrypt(file2);
		var buffer = new Buffer(data);
		fs.writeFileSync(to, buffer);
	}else{
		throw "File is not found!";
	}
	return this;	
}

/**
   * File encryption
   *
   * @param {String} from - decrypted file way
   * @param {String} to - encrypted file way
   * @param {String} password 
   * @param {String} algorithm
   * @return {Object}
 */
sqlite.prototype.encrypt = function(from, to, password, algorithm){
	if(fs.existsSync(from)){
		this.algorithm = algorithm || this.algorithm;
		this.password = password || this.password;
		if(this.algorithms.indexOf(this.algorithm)==-1){
			throw "This algorithm is not supported";
		}
		var db = fs.readFileSync(from);
		var data = this.pvEncrypt(new Buffer(db,"utf-8"));
		var buffer = new Buffer(data);
		fs.writeFileSync(to, buffer);
	}else{
		throw "File is not found!";
	}
	return this;
}

module.exports = new sqlite();







 

