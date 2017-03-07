var expect = require('chai').expect;
var Board = require('./../../models/board');

describe('Board Model', function() {
	
	var fakeUser = {
		name : 'Budiman',
		profilePictureUrl : 'http://google.com',
		getName : function() {
			return this.name;
		},
		getProfilePictureUrl : function() {
			return this.profilePictureUrl;
		}
	}

	var fakeCollaborators = [
		{
			name : 'Budiman',
			profilePictureUrl : 'http://google.com',
			getName : function() {
				return this.name;
			},
			getProfilePictureUrl : function() {
				return this.profilePictureUrl;
			}		
		},
		{
			name : 'Ilham Mansiz',
			profilePictureUrl : 'http://duckduckgo.com',
			getName : function() {
				return this.name;
			},
			getProfilePictureUrl : function() {
				return this.profilePictureUrl;
			}
		}
	];

	var boardInstanceA,boardInstanceB;

	before(function() {
		boardInstanceA = new Board();
		boardInstanceB = new Board();
	})

	it('can set id and get id', function() {
		boardInstanceA.setId('kjskldusydusyuidysuiidy');
		expect(boardInstanceA.getId()).to.equal('kjskldusydusyuidysuiidy')
	})

	it('can set title and get title', function() {
		boardInstanceA.setTitle('Lorem Ipsum Dolor')
		expect(boardInstanceA.getTitle()).to.equal('Lorem Ipsum Dolor')
	});

	it('can set description and get description', function() {
		boardInstanceA.setDescription('Lorem Ipsum Dolor')
		expect(boardInstanceA.getDescription()).to.equal('Lorem Ipsum Dolor')
	});

	it('can set user and get its user data', function() {
		boardInstanceA.setUser(fakeUser);
		expect(boardInstanceA.getUserName()).to.equal('Budiman');
		expect(boardInstanceA.getUserProfilePictureUrl()).to.equal('http://google.com');
	});

	it('it get false if user is set', function() {
		expect(boardInstanceA.isUserNull()).to.equal(false);
	})

	it('it get true if user is set', function() {
		expect(boardInstanceB.isUserNull()).to.equal(true);
	})

	it('can set collaborators and get count', function() {
		boardInstanceA.setCollaborators(fakeCollaborators);
		expect(boardInstanceA.getCountOfCollaborators()).to.equal(fakeCollaborators.length);
	})

	it('can set count of reason and get it', function(){
		boardInstanceA.setCountOfReason(10);
		expect(boardInstanceA.getCountOfReason()).to.equal(10);
	})

	it('can set count of objection and get it', function(){
		boardInstanceA.setCountOfObjection(20);
		expect(boardInstanceA.getCountOfObjection()).to.equal(20);
	})

	it('can set count of rebuttal and get it', function(){
		boardInstanceA.setCountOfRebuttal(23);
		expect(boardInstanceA.getCountOfRebuttal()).to.equal(23);
	})

	it('can set tags and get tags', function() {
		var tags = ['bumi', 'bulat', 'mama'];
		boardInstanceA.setTags(tags);
		expect(boardInstanceA.getTags()).to.equal(tags);
	})

	it('can set topic and retrieve it', function() {
		var topic = 'Science';
		boardInstanceA.setTopic(topic);
		expect(boardInstanceA.getTopic()).to.equal(topic);
	})

	describe('if user is not set', function() {
		it('return empty string when get its user name', function() {
			expect(boardInstanceB.getUserName()).to.equal('');
		})

		it('return empty string when get its user profile picture url', function() {
			expect(boardInstanceB.getUserProfilePictureUrl()).to.equal('');
		})
	})
})