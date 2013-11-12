var net = require('net');

var server = net.createServer(function(socket) {
	console.log('서버 연결 완료');
	socket.on('end', function() {
		console.log('서버 연결 종료');
	});

	socket.write('Dezang\r\n');
});

server.listen(8124, function() {
	console.log('서버가 %d포트로 연결.', server.address().port);
});