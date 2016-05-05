var sqlite = require('../sqlite.js'); //requiring

// Change password
// sqlite.change('test/Database.rec','88560848','myPass','aes-256-ctr','camellia-256-cfb1');

// To use initialization vector
sqlite.iv = "1234567890123456";
var password = "12345678901234567890123456789012";

//Connecting - (databaseFile, [password], [algorithm])
try{
	sqlite.connect('test/Database.rec',password,'aes-256-cbc');
}catch(x){
	console.log(x)
}

// Creating Table - you can run any command
sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

//Inserting - this function can be sync to, look the wiki
sqlite.insert("COMPANYS",{NAME:"COMPANY"}, function(inserid){
	console.log(inserid);
});

//Updating - returns the number of rows modified - can be async too
var rows_modified = sqlite.update("COMPANYS",{NAME:"TESTING UPDATE"},{ID:1});

//Create your function
function concat(a,b){
	return a+b;
}

//Add your function to connection
// sqlite.create_function(concat);

// // Use your function in the SQL
// console.log(sqlite.run("SELECT ID , concat(ID, NAME) as concat FROM COMPANYS;"));

// //Decrypting database file
// sqlite.decrypt("test/Database.rec","test/decrypted.db", 'myPass');

// //Encrypting database file
// sqlite.encrypt("test/decrypted.db","test/reencrypted.rec", 'myPass',"bf",{iv: "ads343ef"});

// // Closing connection 
sqlite.close();