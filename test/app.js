var sqlite = require('../sqlite.js');

sqlite.connect('Teste.erwr','18021994');

sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

sqlite.insert("COMPANYS",{NAME:"My COMPANY Ãé"}, function(inserid){
	console.log(inserid);
});

console.log(sqlite.run("SELECT name FROM COMPANYS;"));

sqlite.encrypt('test.db','test.aes','eirdjhas1293');

sqlite.decrypt('test.aes','decrypted.db','eirdjhas1293');