module.exports = function(server){
	var io = require('socket.io')(server);
	io.sockets.on("connection", function(socket){
		console.log("entre en conections")
		socket.on('error sesion', function(ms){
			console.log("estoy en el error")
			socket.broadcast.emit("error en sesiones", "open modal")
		})
		socket.on('join',function(ms){
			console.log(ms)
		})
	})
}