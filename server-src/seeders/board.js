const faker = require('faker');
const slugify = require('slugify');
const mongoose = require('../mongoose');
const Board = require('../models/board');
const User = require('../models/user');
const { async, await } = require('asyncawait');
const config = require('../../config.json');
const dbName = config.dbName;

const createUser = () => {
  const user = new User({
    displayName : faker.name.findName(),
    profilePicUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542',
    gender : 'Male',
    email : faker.internet.email()
  });

  return user.save();
}

const createBoard = (creatorId) => {
  const title = faker.lorem.sentence();
  const slug = slugify(title);

  const board = new Board({
    creator : creatorId,
    title : title,
    description : faker.lorem.sentences(),
    tags : [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    published : true,
    slug : slug
  });

  return board.save();
}

(async(() => {
  
  mongoose.connect('mongodb://localhost/' + dbName);

  const boardSavePromises = [];
  const newUser = await(createUser());

  for(let count = 0; count <= 100; count++) {
    boardSavePromises.push(createBoard(newUser._id));
  }

  await(Promise.all(boardSavePromises));

  console.log('Seed Completed');

  mongoose.disconnect();

}))();