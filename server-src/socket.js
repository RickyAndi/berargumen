const socket = require('socket.io');

module.exports = function(server) {
  const io = socket(server);

  const card = io.of('/card');
  
  card.on('connection', socket => {

  });

  return {
    card : card
  };
};
