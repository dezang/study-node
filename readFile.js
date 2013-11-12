var fs = require('fs');

fs.readFile('./README.md', encoding='utf-8', function(err, data) {
	if(err) {
		throw err;
	}
	console.log(data);
});

console.log('파일의 내용 : ');