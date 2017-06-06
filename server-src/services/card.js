const Card = require('../models/card');
const { async, await } = require('asyncawait');

module.exports = (() => {
  const create = async((data, userId) => {
    const toBeCreatedCard = new Card({
        creator : data.creator,
        content : data.title,
        type : data.type,
        top : data.top,
        left : data.left,
        board : data.boardId
    });
    const newCard = await(toBeCreatedCard.save());
    return newCard;
  })

  return {
    create : create
  }
})();