var fs = require('fs');

fs.rename('./test.txt', './dztest.txt', function(err) {
		if(err) throw err;
		console.log('수정완료');
});