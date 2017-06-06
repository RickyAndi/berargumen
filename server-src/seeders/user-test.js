const mongoose = require('../mongoose');
const User = require('../models/user');
const { async, await } = require('asyncawait');
const config = require('../../config.json');
const dbName = config.dbName[process.env.NODE_ENV];

(async(() => {
    mongoose.connect('mongodb://localhost/' + dbName);
    
    const userData = {
        displayName : 'admin',
        email : 'admin@admin.com',
        profilePicUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542',
        gender : 'male'
    }

    const userToBeSaved = new User(userData);
    await(userToBeSaved.save());

    console.log('seed user admin completed');

    mongoose.disconnect();
}))();