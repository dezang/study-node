var fs = require('fs');

fs.writeFile('./example.txt', 'Hwang Dezang과 함께하는 신나는 월요일', 'utf8', function(err) {
	if(err) throw err;
	console.log('파일작성완료');
});