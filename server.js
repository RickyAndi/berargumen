const app = require('./server-src/app');
const server = require('http').Server(app);
const sockets  = require('./server-src/socket')(server);

const indexRoute = require('./server-src/routes/index')(sockets);
const apiRoute = require('./server-src/routes/api')(sockets);
const boardRoute = require('./server-src/routes/board')(sockets);

app.use('/api', apiRoute);
app.use('/', indexRoute);
app.use('/board', boardRoute);

server.listen(3000, function() {
  console.log('App Listen On Port 3000')
});