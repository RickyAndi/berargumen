var app = require('./server-src/app');
var server = require('http').Server(app);
var sockets  = require('./server-src/socket')(server);

var indexRoute = require('./server-src/routes/index')(sockets);

app.use('/', indexRoute);

server.listen(3000, function() {
	console.log('App Listen On Port 3000')
});