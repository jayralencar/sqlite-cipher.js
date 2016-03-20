var sqlite = require('../sqlite.js');

sqlite.connect('Teste.erwr','18021994');

sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

sqlite.insert("COMPANYS",{NAME:"COMPANY"}, function(inserid){
	console.log(inserid);
});

sqlite.run("DELETE FROM COMPANYS WHERE NAME = '?'",['COMPANY']);

console.log(sqlite.run("SELECT * FROM COMPANYS;"));


