# Change Log
This change log is started in 0.3.2;

## 0.3.5 (2016-05-05)
- Fixing error in the usage of initializations vector

## 0.3.4 (2016-04-28)
- Using algorithm and password in pvDecrypt
- Using algorithm and password in pvEncrypt
- Create function to change password and algorithm.
```js
	sqlite.change(filePath, oldPassword, newPassword, oldAlgorithm, newAlgorithm);
```

## 0.3.3 (2016-04-26)
- Show error if password is invalid - review

## 0.3.2 (2016-04-23)
- Show error if password is invalid