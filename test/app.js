var sqlite = require('../sqlite.js');

sqlite.connect('Teste.err','18021994');

sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

sqlite.insert("COMPANYS",{NAME:"My COMPANY"}, function(inserid){
	console.log(inserid);
});

console.log(sqlite.run("SELECT name FROM COMPANYS;"));