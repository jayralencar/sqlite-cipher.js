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
sqlite.prototype.iv = null;

/**
   * Buffer decryption
   *
   * @param {Object} buffer - Encrypted buffer
   * @param {String} algorithm - Algorithm
   * @param {String} password - Password
   * @return {Object} - Decrypted buffer
 */
sqlite.prototype.pvDecrypt = function(buffer, algorithm, password){
	algorithm = algorithm || this.algorithm;
	password = password || this.password;
	if(this.iv){
		var decipher = crypto.createDecipheriv(algorithm,password,this.iv);
	}else{
		var decipher = crypto.createDecipher(algorithm,password);
	}
  	var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
  	return dec;
}

/**
   * Buffer encryption
   *
   * @param {Object} buffer - buffer
   * @param {String} algorithm - Algorithm
   * @param {String} password - Password
   * @return {Object} - Encrypted buffer
 */
sqlite.prototype.pvEncrypt = function(buffer, algorithm, password){
	algorithm = algorithm || this.algorithm;
	password = password || this.password;
	if(this.iv){
		var cipher = crypto.createCipheriv(algorithm,password, this.iv);
	}else{
		var cipher = crypto.createCipher(algorithm,password);
	}
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

	var res = this.run("CREATE TABLE jayr(name TEXT)");
	if(res.error){
		throw "Invalid Password! Please check your password or database name.";
	}else{
		this.run("DROP TABLE jayr")
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
sqlite.prototype.decrypt = function(from, to, password, algorithm, options){
	if(fs.existsSync(from)){
		if(options){
			if(options.iv){
				this.iv = options.iv;
			}
		}
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
sqlite.prototype.encrypt = function(from, to, password, algorithm, options){
	if(fs.existsSync(from)){
		if(options){
			if(options.iv){
				this.iv = options.iv;
			}
		}
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


/**
	* Changing password
	*
	* @param {String} file - file path
	* @param {String} oldPassword - password
	* @param {String} newPassword - password
	* @param {String} algorithm - algorithm
	* @param {String} newAlgorithm - newAlgorithm
*/

sqlite.prototype.change = function(file, oldPassword, newPassword, algorithm, newAlgorithm) {
	if(!file){
		throw "Please inform a file!";
	}else{
		if(fs.existsSync(file)){
			if(!oldPassword || typeof(oldPassword) != "string"){
				throw "Please inform your password!";
			}else if(!newPassword || typeof(newPassword) != "string"){
				throw "Please inform your new password!";
			}else{
				if(typeof(algorithm)!='string'){
					callback = algorithm;
					algorithm = this.algorithm;
				}
				if(this.algorithms.indexOf(algorithm)==-1){
					throw "This algorithm is not supported";
				}else{
					if(typeof(newAlgorithm)!='string'){
						callback = newAlgorithm;
						newAlgorithm = algorithm;
					}
					if(this.algorithms.indexOf(newAlgorithm)==-1){
						throw "Your new algorithm is not supported";
					}else{
						try{
							this.connect(file, oldPassword, algorithm);
							var decrypted = this.pvDecrypt(fs.readFileSync(file), algorithm, oldPassword);
							var encrypted = this.pvEncrypt(decrypted,newAlgorithm, newPassword);
							var buffer = new Buffer(encrypted);
							fs.writeFileSync(file, buffer);
						}catch(x){
							throw x;
						}
					}
				}
			}
		}else{
			throw "File is not found!";	
		}
	}


};

module.exports = new sqlite();







 

