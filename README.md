<img src="https://github.com/JayrAlencar/sqlite-cipher.js/blob/master/images/logo.png?raw=true"/>
</br>
[![NPM](https://nodei.co/npm/sqlite-cipher.png?downloads=true&downloadRank=true)](https://nodei.co/npm/sqlite-cipher/)
</br>

## Contents
- [Install](#install)
- [Usage](#usage)
- [Encrypt](#encryptfrom-to-password)
- [Decrypt](#decryptfrom-to-password)
- [Algorithm List](#algorithm-list)
- [Wiki](https://github.com/JayrAlencar/sqlite-sync.js/wiki)

Module to handle encrypted sqlite databases
## Install
To install this module open your prompt or terminal and run:
```shell
npm install sqlite-cipher
```
#Usage
You can open encrypted database file or create a new also encrypted. And you can encrypt or decrypt an existent file.

## connect(file, password)
Opening a encrypted database file or creating a new.
```js
  var sqlite = require('sqlite-cipher'); //requiring

  //Connecting - (databaseFile, [password], [algorithm])
  sqlite.connect('test/Database.enc','myPass','aes-256-ctr');
  
  //Creating Table - you can run any command
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
  sqlite.create_function(concat);
  
  // Use your function in the SQL
  console.log(sqlite.run("SELECT ID , concat(ID, NAME) as concat FROM COMPANYS;"));

  // Closing connection 
  sqlite.close();
```

## encrypt(from, to, password)
Encrypting an database. In the output file you can use any extension.
```js
var sqlite = require('sqlite-cipher');
  
//(from, to, password, [algorithm])
sqlite.encrypt("test/decrypted.db","test/reencrypted.rec", "myPass","aes-256-ctr");
```

## decrypt(from, to, password)
Decrypting an database.
```js
var sqlite = require('sqlite-cipher');

//(from, to, password, [algorithm])
sqlite.decrypt("test/Database.enc","test/decrypted.db", "myPass", "aes-256-ctr");
```


# Using SQL
This module is it´s similar to <a href="https://github.com/jayralencar/sqlite-sync.js">sqlite-sync.js</a>
### See more <a href="https://github.com/JayrAlencar/sqlite-sync.js/wiki">HERE</a>

# Algorithm list
In sqlite-cipher.js We use crypto-js to encrypt and decrypt the data and files. And the algorithms that it supports are:
```
'CAST-cbc',
'aes-128-cbc',
'aes-128-ccm',
'aes-128-cfb',
'aes-128-cfb1',
'aes-128-cfb8',
'aes-128-ctr',
'aes-128-ecb',
'aes-128-gcm',
'aes-128-ofb',
'aes-128-xts',
'aes-192-cbc',
'aes-192-ccm',
'aes-192-cfb',
'aes-192-cfb1',
'aes-192-cfb8',
'aes-192-ctr',
'aes-192-ecb',
'aes-192-gcm',
'aes-192-ofb',
'aes-256-cbc',
'aes-256-ccm',
'aes-256-cfb',
'aes-256-cfb1',
'aes-256-cfb8',
'aes-256-ctr',
'aes-256-ecb',
'aes-256-gcm',
'aes-256-ofb',
'aes-256-xts',
'aes128',
'aes192',
'aes256',
'bf',
'bf-cbc',
'bf-cfb',
'bf-ecb',
'bf-ofb',
'blowfish',
'camellia-128-cbc',
'camellia-128-cfb',
'camellia-128-cfb1',
'camellia-128-cfb8',
'camellia-128-ecb',
'camellia-128-ofb',
'camellia-192-cbc',
'camellia-192-cfb',
'camellia-192-cfb1',
'camellia-192-cfb8',
'camellia-192-ecb',
'camellia-192-ofb',
'camellia-256-cbc',
'camellia-256-cfb',
'camellia-256-cfb1',
'camellia-256-cfb8',
'camellia-256-ecb',
'camellia-256-ofb',
'camellia128',
'camellia192',
'camellia256',
'cast',
'cast-cbc',
'cast5-cbc',
'cast5-cfb',
'cast5-ecb',
'cast5-ofb',
'des',
'des-cbc',
'des-cfb',
'des-cfb1',
'des-cfb8',
'des-ecb',
'des-ede',
'des-ede-cbc',
'des-ede-cfb',
'des-ede-ofb',
'des-ede3',
'des-ede3-cbc',
'des-ede3-cfb',
'des-ede3-cfb1',
'des-ede3-cfb8',
'des-ede3-ofb',
'des-ofb',
'des3',
'desx',
'desx-cbc',
'id-aes128-CCM',
'id-aes128-GCM',
'id-aes128-wrap',
'id-aes192-CCM',
'id-aes192-GCM',
'id-aes192-wrap',
'id-aes256-CCM',
'id-aes256-GCM',
'id-aes256-wrap',
'id-smime-alg-CMS3DESwrap',
'idea',
'idea-cbc',
'idea-cfb',
'idea-ecb',
'idea-ofb',
'rc2',
'rc2-40-cbc',
'rc2-64-cbc',
'rc2-cbc',
'rc2-cfb',
'rc2-ecb',
'rc2-ofb',
'rc4',
'rc4-40',
'rc4-hmac-md5',
'seed',
'seed-cbc',
'seed-cfb',
'seed-ecb',
'seed-ofb' 
```

# Tutorials
English > <a href="http://jayralencar.com.br/create-database-sqlite-encrypted-with-node-js/">Create database sqlite encrypted with node.js</a></br>
Português > <a href="http://clubedosgeeks.com.br/banco-de-dados/banco-de-dados-sqlite-criptografado-em-node-js">Banco de Dados sqlite criptografado em node.js</a>
