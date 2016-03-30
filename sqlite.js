var fs = require('fs');
var crypto = require('crypto');

function sqlite () {}

sqlite.prototype = require('sqlite-sync');
sqlite.prototype.buffer = null;
sqlite.prototype.file2 = null;
sqlite.prototype.password = null;
sqlite.prototype.algorithm = 'aes-256-ctr';
sqlite.prototype.algorithms = crypto.getCiphers();

sqlite.prototype.pvDecrypt = function(buffer,password){
  var decipher = crypto.createDecipher(this.algorithm,password)
  var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
  return dec;
}

sqlite.prototype.pvEncrypt = function(buffer,password){
  var cipher = crypto.createCipher(this.algorithm,password)
  var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
  return crypted;
}

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
		var file2buffer = this.pvDecrypt(file2, this.password);
		this.con(file2buffer);
	}else{
		this.con(1);
	}

	return this;	
}

sqlite.prototype.writer = function(buffer){
	var data = this.pvEncrypt(new Buffer(buffer, "utf-8"), this.password);
	var buffer = new Buffer(data);
	console.log(this.file2)
	fs.writeFileSync(this.file2, buffer);
}

sqlite.prototype.decrypt = function(from, to, password, algorithm){
	if(fs.existsSync(from)){
		this.algorithm = algorithm || this.algorithm;
		if(this.algorithms.indexOf(this.algorithm)==-1){
			throw "This algorithm is not supported";
		}
		var file2 = fs.readFileSync(from);
		var data = this.pvDecrypt(file2, password);
		var buffer = new Buffer(data);
		fs.writeFileSync(to, buffer);
	}else{
		throw "File is not found!";
	}
	return this;	
}

sqlite.prototype.encrypt = function(from, to, password, algorithm){
	if(fs.existsSync(from)){
		this.algorithm = algorithm || this.algorithm;
		if(this.algorithms.indexOf(this.algorithm)==-1){
			throw "This algorithm is not supported";
		}
		var db = fs.readFileSync(from);
		var data = this.pvEncrypt(new Buffer(db,"utf-8"), password);
		var buffer = new Buffer(data);
		fs.writeFileSync(to, buffer);
	}else{
		throw "File is not found!";
	}
	return this;
}

module.exports = new sqlite();







 

