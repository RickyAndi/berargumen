var expect = require('chai').expect;
var User = require('./../../models/user');

describe('User Model', function() {

	var userInstance;

	before(function() {
		userInstance = new User();
	})

	it('can set id and retrieve its id', function() {
		userInstance.setId('lashasghjagshahshakj');
		expect(userInstance.getId()).to.equal('lashasghjagshahshakj');
	})

	it('Can set name and retrieve name', function() {
		userInstance.setName('budiman');
		expect(userInstance.getName()).to.equal('budiman');
	})

	it('Can retrieve profile picture url', function() {
		userInstance.setProfilePictureUrl('http://google.com');
		expect(userInstance.getProfilePictureUrl()).to.equal('http://google.com');
	})
})