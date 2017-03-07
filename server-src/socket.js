var socket = require('socket.io');

module.exports = function(server) {
	var io = socket(server);

	var card = io.of('/card');
	
	card.on('connection', function(socket) {
		socket.on('send-message', function(data) {
			console.log(data.message)
		})
	})

	return {
		card : card
	}
}