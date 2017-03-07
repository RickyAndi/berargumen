var Vue = require('vue');
var $ = require('jquery');
var expect = require('chai').expect;
var cardComponent = require('./../../vue_components/card');
var sinon = require('sinon');

var Card = require('./../../models/card');
var User = require('./../../models/user');
var Relation = require('./../../models/relation');

const cardTypeTextHashMap = require('./../../consts/card-type-text-hash-map');

describe('Card component', function() {

	var vmA, vmB, cardIndex, selectCardCallback, userDataFromServer, cardDataFromServer, cardInstance, userInstance, cardCreatorInstance, relationInstance;

	before(function() {
		
		selectCardCallback = sinon.spy();

		userDataFromServer = {
			id : 'hijklmn',
			name : 'kabayan',
			profilePictureUrl : 'http://duckduckgo.com'
		}

		cardDataFromServer = {
			id : 'abcdefg',
			content : 'Aku adalah anak gembala',
			type : 'premise',
			top : '100px',
			left : '200px',
			creator : {
				id : 'klmnopqrs',
				name : 'budimen',
			},
			relation : {
				toCardId : 'opqrstu',
				type : 'premise'
			}
		}

		cardDataFromServerB = {
			id : 'klmnopqres',
			content : 'Aku adalah anak gembala',
			type : 'premise',
			top : '100px',
			left : '200px',
			creator : {
				id : 'klmnopqrs',
				name : 'budimen',
			},
			relation : {
				toCardId : 'opqrstu',
				type : 'premise'
			}
		}

		userInstance = new User();
		userInstance
			.setId(userDataFromServer.id)
			.setName(userDataFromServer.name)
			.setProfilePictureUrl(userDataFromServer.profilePictureUrl);

		cardInstance = new Card();
		cardInstance
			.setId(cardDataFromServer.id)
			.setContent(cardDataFromServer.content)
			.setType(cardDataFromServer.type)
			.setTop(cardDataFromServer.top)
			.setLeft(cardDataFromServer.left);

		cardCreatorInstance = new User();
		cardCreatorInstance
			.setId(cardDataFromServer.creator.id)
			.setName(cardDataFromServer.creator.name);

		cardInstance.setCreator(cardCreatorInstance);

		relationInstance = new Relation();
		relationInstance
			.setToCardId(cardDataFromServer.relation.toCardId)
			.setType(cardDataFromServer.relation.type);

		cardInstance.setRelation(relationInstance);

		cardIndex = 1;

		vmA = new Vue({
			template : 
			`
				<div>
					<card 
						ref="cardComponent" 
						v-bind:selectedCardIndex="selectedCardIndex" 
						v-bind:card="card" 
						v-bind:cardIndex="cardIndex"
						v-on:card-selected="selectCard"
					>
					</card>
				</div>
			`,
			components : {
				'card' : cardComponent
			},
			data : {
				cardIndex : cardIndex,
				card : cardInstance,
				selectedCardIndex : 0
			},
			methods : {
				selectCard : function(args) {
					selectCardCallback(args);
				}
			}
		}).$mount()
	})

	it('get right id of card as element id', function() {
		var $cardComponentElement = $(vmA.$el);
		var elementIdFromDOM = $cardComponentElement.find('.panel').attr('id');
		expect(elementIdFromDOM).to.equal(cardInstance.getId());
	})

	it('get right type text depend on card model type on its DOM', function() {
		var $cardComponentElement = $(vmA.$el);
		var cardTypeTextFromDOM = $cardComponentElement.find('.panel').find('.panel-heading').find('.card-type').text();
		expect(cardTypeTextFromDOM).to.equal(cardTypeTextHashMap[cardInstance.getType()]);
	})

	it('if card type is premise its panel class become panel-success', function() {
		var $cardComponentElement = $(vmA.$el).find('.panel-success');
		expect($cardComponentElement.length).to.equal(1)
	})

	it('get right card content on its DOM', function() {
		var $cardComponentElement = $(vmA.$el);
		var cardContentTextFromDOM = $cardComponentElement.find('.panel').find('.panel-body').find('.card-content').text();
		expect(cardContentTextFromDOM).to.equal(cardInstance.getContent());
	})

	it('get right card content on its DOM even its content model changed', function(done) {
		var newContent = 'sesuatu yang aku tahu adalah aku tidak tahu apa apa';

		cardInstance.setContent(newContent);

		Vue.nextTick(function() {
			var $cardComponentElement = $(vmA.$el);
			var cardContentTextFromDOM = $cardComponentElement.find('.panel').find('.panel-body').find('.card-content').text();
			expect(cardContentTextFromDOM).to.equal(newContent);
			done();
		})
	})

	it('get right card creator name in its DOM', function() {
		var $cardComponentElement = $(vmA.$el);
		var cardCreatorNameTextFromDOM = $cardComponentElement.find('.panel').find('.panel-footer').find('.card-creator-name').text();
		expect(cardCreatorNameTextFromDOM).to.equal(cardInstance.getCreatorName());
	})

	it('when select-card event happen, it will invoke parent callback handler with its argument', function() {
		vmA.$refs.cardComponent.selectThisCard();
		expect(selectCardCallback.called).to.equal(true);
		expect(selectCardCallback.args[0][0].cardIndex).to.equal(cardIndex);
	})

	it('get right inline style in its DOM', function() {
		var $cardComponentElement = $(vmA.$el).find('.panel');
		expect($cardComponentElement.css('left')).to.equal(cardInstance.getLeft());
		expect($cardComponentElement.css('top')).to.equal(cardInstance.getTop());
	})

	it('get right inline style in its DOM even when its model change', function(done) {
		var newTopValue = '400px';
		var newLeftValue = '900px';
		
		cardInstance.setTop(newTopValue);
		cardInstance.setLeft(newLeftValue);

		Vue.nextTick(function() {
			var $cardComponentElement = $(vmA.$el).find('.panel');
			expect($cardComponentElement.css('left')).to.equal(newLeftValue);
			expect($cardComponentElement.css('top')).to.equal(newTopValue);
			done()
		})
	})

	it('if selected card index is same with card index, it will get selected-card class', function(done) {
		
		var $selectedCardElement = $(vmA.$el).find('.selected-card');
		expect($selectedCardElement.length).to.equal(0)

		vmA.selectedCardIndex = cardIndex;

		Vue.nextTick(function() {
			var $selectedCardElement = $(vmA.$el).find('.selected-card');
			expect($selectedCardElement.length).to.equal(1)
			done()
		})
	})
});