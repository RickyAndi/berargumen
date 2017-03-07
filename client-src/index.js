var Vue = require('vue');
var io = require('socket.io-client');

new Vue({
	el: '#app',
	data : {
		sockets : {
			card : null
		},
		message : ''
	},
	methods : {
		sendMessage : function() {
			this.sockets.card.emit('send-message', { message : this.message});
		}
	},
	mounted : function() {
		this.sockets.card = io('/card');

		

		this.sockets.card.on('user-visited', function() {
			console.log('kekek')
		})
	}
})