var sqlite = require('../sqlite.js');

sqlite.connect('test/Database.enc','myPass');

sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

sqlite.insert("COMPANYS",{NAME:"COMPANY"}, function(inserid){
	console.log(inserid);
});

console.log(sqlite.run("SELECT * FROM COMPANYS;"));

sqlite.decrypt("test/Database.enc","test/decrypted.db", 'myPass');
sqlite.encrypt("test/decrypted.db","test/reencrypted.rec", 'myPass',"bf");


