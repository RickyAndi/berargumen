var express = require('express')
var router = express.Router()

module.exports = function(sockets) {
	router.get('/', function (req, res) {

		sockets.card.emit('user-visited');
		
	  	res.render('index.ejs');
	})

	return router;
}