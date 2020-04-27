var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/test', (req, res)=>{
	res.status(200).send('Holamundo desde una ruta');
});

var messages = [{
	id: 1,
	texto: "Chat privado",
	nickname: "Bot - jose alberto"
}];

io.on('connection', function(socket){
	console.log("El cliente con IP" + socket.handshake.address + "se ha conectado...");

	socket.emit('messages', messages);

	socket.on('add-message', (data)=>{
		messages.push(data);

		io.sockets.emit('messages', messages);
	});

});

server.listen(6677, function(){
	console.log("Servidor esta funcionando en http://localhost:6677");
});