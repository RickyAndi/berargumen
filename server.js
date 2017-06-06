const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('./server-src/mongoose');
const db = mongoose.connection;
const app = require('./server-src/app');
const server = require('http').Server(app);
const sockets  = require('./server-src/socket')(server);
const passport = require('./server-src/passport');

const indexRoute = require('./server-src/routes/index')(sockets);
const apiRoute = require('./server-src/routes/api')(sockets);
const boardRoute = require('./server-src/routes/board')(sockets);
const authRoute = require('./server-src/routes/auth')();
const profileRoute = require('./server-src/routes/profile')();

const config = require('./config.json');
const appPort = config.appPort;
const dbName = config.dbName;
const secretSession = config.secretSession;

mongoose.connect('mongodb://localhost/' + dbName);

require('./server-src/models/require-models')();

app.use(session({ 
  secret: secretSession, 
  resave: true, 
  saveUninitialized: true
}));

app.use(expressValidator({
  customValidators: {
    isArrayAndHaveLength: function(value) {
        return Array.isArray(value) && value.length !== 0;
    },

 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoute);
app.use('/', indexRoute);
app.use('/board', boardRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  server.listen(appPort, () => {
    console.log('App Listen On Port ' + appPort)
  });
});
