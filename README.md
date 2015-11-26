# sqlite-cipher.js

Module to handle encrypted sqlite databases

<img src="https://github.com/JayrAlencar/sqlite-cipher.js/blob/master/images/logo.png?raw=true"/>
</br>
[![NPM](https://nodei.co/npm/sqlite-cipher.png?downloads=true&downloadRank=true)](https://nodei.co/npm/sqlite-cipher/)
## Install
To install this module open your prompt or terminal and run:
</br>
<code>$ npm install sqlite-cipher</code>

#Usage
You can open encrypted database file or create a new also encrypted. And you can encrypt or decrypt an existent file.

## connect(file, password)
Opening a encrypted database file or creating a new.
<pre>
  <code>
    var sqlite = require('sqlite-cipher');

    sqlite.connect('myEncrypedFile.myextension','MyPassword');
    
    sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");
    
    sqlite.insert("COMPANYS",{NAME:"My COMPANY"}, function(inserid){
    	console.log(inserid);
    });
    
    console.log(sqlite.run("SELECT name FROM COMPANYS;"));
  </code>
</pre>

## encrypt(from, to, password)
Encrypting an database. In the output file you can use any extension.
<pre>
  <code>
    var sqlite = require('sqlite-cipher');
    sqlite.encrypt('myDataBase.db', 'outputFile.extension', 'MyPassword');
  </code>
</pre>

## decrypt(from, to, password)
Decrypting an database.
<pre>
  <code>
    var sqlite = require('sqlite-cipher');
    sqlite.decrypt('outputFile.extension', 'myDecrypted.db', 'MyPassword');
  </code>
</pre>

# Using SQL
This module is it´s similar to <a href="https://github.com/JayrAlencar/sqlite-sync.js">sqlite-sync.js</a>
### See more <a href="https://github.com/JayrAlencar/sqlite-sync.js/wiki">HERE</a>
