var expect = require('chai').expect;
var Card = require('./../../models/card');

describe('Card Model', function() {

	var cardInstance, cardInstanceB, fakeUser, fakeUserB, fakeRelation;
	
	before(function() {

		fakeUser = {
			getId : function() {
				return 'zjikjajaj';
			},
			getName : function() {
				return 'budimen';
			}
		}

		fakeUserB = {
			getId : function() {
				return 'jkasjashjasjasjkajs';
			},
			getName : function() {
				return 'budiman';
			}
		}

		fakeRelation = {
			getToCardId : function() {
				return 'abcdefgh';
			},
			getType : function() {
				return 'premise';
			}
		}

		cardInstance = new Card();
		cardInstanceB = new Card();
	})

	it('can set id and get its id', function() {
		cardInstance.setId('klmnopqrstuvwxyz');
		expect(cardInstance.getId()).to.equal('klmnopqrstuvwxyz');
	})

	it('can set content and retrive its content', function() {
		cardInstance.setContent('Lorem ipsum dolor sit amet');
		expect(cardInstance.getContent()).to.equal('Lorem ipsum dolor sit amet');
	})

	it('can set type and retrieve type', function() {
		cardInstance.setType('premise');
		expect(cardInstance.getType()).to.equal('premise');
	})

	it('can set top and retrieve it', function() {
		cardInstance.setTop('100px');
		expect(cardInstance.getTop()).to.equal('100px');
	})

	it('can set left and retrieve it', function() {
		cardInstance.setLeft('200px');
		expect(cardInstance.getLeft()).to.equal('200px');
	})

	describe('about creator', function() {
		before(function() {
			cardInstance.setCreator(fakeUser);
		});

		it('can retrieve its creator name', function() {
			expect(cardInstance.getCreatorName()).to.equal(fakeUser.getName());
		})

		it('if the creator is null, it return empty string', function() {
			expect(cardInstanceB.getCreatorName()).to.equal('');
		})

		it('can return false if there is creator', function() {
			expect(cardInstance.isCreatorNull()).to.not.be.true;
		})

		it('can return true if there is no creator', function() {
			expect(cardInstanceB.isCreatorNull()).to.be.true;
		})

		it('can decide if user is creator fo card', function() {
			expect(cardInstance.isUserCreator(fakeUserB)).to.not.be.true;
			expect(cardInstance.isUserCreator(fakeUser)).to.be.true;
		})
	})

	describe('about relation', function() {
		it('can set relation and retrieve it', function() {
			cardInstance.setRelation(fakeRelation);
			expect(cardInstance.getRelatedToCardId()).to.equal(fakeRelation.getToCardId());
			expect(cardInstance.getRelationType()).to.equal(fakeRelation.getType());
		})

		it('if relation is null, it will return null', function() {
			expect(cardInstanceB.getRelatedToCardId()).to.be.null;
			expect(cardInstanceB.getRelationType()).to.be.null;
		})
	})
})